<template>
  <v-form ref="editProfile" v-model="valid" onSubmit="return false;" @submit="signUp">
    <v-row>
      <v-col class="py-0" cols="12" sm="6">
        <v-text-field
          v-if="$i18n.locale === 'fa'"
          v-model="information.firstnameFa"
          :label="$t('form.nameInPersian')"
          required
          :rules="requiredRules"
          v-bind="filedProps"
        />
      </v-col>
      <v-col class="py-0" cols="12" sm="6">
        <v-text-field
          v-if="$i18n.locale === 'fa'"
          v-model="information.lastnameFa"
          :label="$t('form.lastNameInPersian')"
          required
          :rules="requiredRules"
          v-bind="filedProps"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="py-0" cols="12" sm="6">
        <v-text-field
          v-model="information.firstnameEn"
          :label="$t('form.nameInEnglish')"
          required
          :rules="requiredRules"
          v-bind="filedProps"
          dir="ltr"
        />
      </v-col>
      <v-col class="py-0" cols="12" sm="6">
        <v-text-field
          v-model="information.lastnameEn"
          :label="$t('form.lastNameInEnglish')"
          required
          :rules="requiredRules"
          v-bind="filedProps"
          dir="ltr"
        />
      </v-col>
    </v-row>

    <v-dialog ref="dialog" v-model="menu" :return-value.sync="information.birthDate" width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="information.birthDate"
          v-bind="filedProps"
          required
          :rules="requiredRules"
          :label="$t('form.birthday')"
          readonly
          v-on="on"
          dir="ltr"
          @focus="menu = true"
        />
      </template>
      <v-date-picker
        v-model="information.birthDate"
        :max="new Date().toISOString().substr(0, 10)"
        ref="picker"
        min="1950-01-01"
        locale="en-US"
        scrollable
        @change="save"
      />
    </v-dialog>

    <v-text-field v-model="information.university" :label="$t('form.educationPlace')" required :rules="requiredRules" v-bind="filedProps" />

    <v-btn :disabled="!valid || !edited" :loading="loading" type="submit" v-bind="primaryButtonProps">
      <v-icon left>mdi-account-edit-outline</v-icon>
      {{ $t('dashboard.editProfile') }}
    </v-btn>
  </v-form>
</template>

<script>
import { emailRules, requiredRules } from '../../../mixins/formValidations';
import { primaryButtonProps } from '../../../mixins/buttonProps';
import { fieldProps } from '../../../mixins/fieldProps';
import { editProfile } from '../../../api';

export default {
  mixins: [requiredRules, emailRules, primaryButtonProps, fieldProps],
  data() {
    return {
      valid: false,
      information: {
        firstnameFa: '',
        firstnameEn: '',
        lastnameFa: '',
        lastnameEn: '',
        birthDate: '',
        university: '',
      },
      menu: false,
      loading: false,
    };
  },
  computed: {
    edited() {
      const profile = this.$auth.user.profile;
      if (!profile) return false;
      return (
        this.information.firstnameFa !== profile.firstname_fa ||
        this.information.firstnameEn !== profile.firstname_en ||
        this.information.lastnameFa !== profile.lastname_fa ||
        this.information.lastnameEn !== profile.lastname_en ||
        this.information.birthDate !== profile.birth_date ||
        this.information.university !== profile.university
      );
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
  methods: {
    save(date) {
      this.$refs.dialog.save(date);
      this.menu = false;
    },
    async signUp() {
      // const config = {
      //   url: EDIT_PROFILE.url,
      //   method: EDIT_PROFILE.method,
      //   [EDIT_PROFILE.payload]: {
      //     firstname_fa: this.nameInPersian,
      //     firstname_en: this.nameInEnglish,
      //     lastname_fa: this.lastNameInPersian,
      //     lastname_en: this.lastNameInEnglish,
      //     birth_date: this.birthday,
      //     university: this.university,
      //   },
      // };
      
      this.loading = true;
      let { data } = await editProfile(this.$axios,this.information);
      this.loading = false;
      if (data.profile) {
        this.$auth.fetchUser().then(() => {
          this.resetForm();
          this.$toast.success('پروفایل با موفقیت ویرایش شد.');
        });
      } else {
        this.$toast.error('ویرایش با خطا مواجه شد.');
      }
    },
    resetForm() {
      const profile = this.$auth.user.profile;
      if (!profile) return;
      this.information.firstnameFa = profile.firstname_fa;
      this.information.firstnameEn = profile.firstname_en;
      this.information.lastnameFa = profile.lastname_fa;
      this.information.lastnameEn = profile.lastname_en;
      this.information.birthDate = profile.birth_date;
      this.information.university = profile.university;
    },
  },
  mounted() {
    this.resetForm();
  },
};
</script>
