<template>
  <div class="pa-5">
    <v-form ref="editProfile" v-model="valid" onSubmit="return false;" @submit="signUp">
      <v-row>
        <div class="pa-3 d-flex align-center mb-12">
          <v-icon class="ml-3" color="primary">mdi-account-circle-outline</v-icon>
          <h2>اطلاعات شخصی</h2>
        </div>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field
            v-if="$i18n.locale === 'fa'"
            v-model="information.firstnameFa"
            :label="$t('form.nameInPersian')"
            required
            :rules="requiredRules"
            v-bind="filedProps"
            @keyup="edited"
          />
        </v-col>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field
            v-if="$i18n.locale === 'fa'"
            v-model="information.lastnameFa"
            :label="$t('form.lastNameInPersian')"
            required
            :rules="requiredRules"
            v-bind="filedProps"
            @keyup="edited"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field
            v-model="information.firstnameEn"
            :label="$t('form.nameInEnglish')"
            required
            :rules="requiredRules"
            v-bind="filedProps"
            dir="ltr"
            @keyup="edited"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field
            v-model="information.lastnameEn"
            :label="$t('form.lastNameInEnglish')"
            required
            :rules="requiredRules"
            v-bind="filedProps"
            dir="ltr"
            @keyup="edited"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-6" cols="12">
          <v-text-field v-model="information.birthDate" v-bind="filedProps" required :rules="requiredRules" label="سال ورودی" dir="ltr" />
        </v-col>
      </v-row>

      <v-text-field
        v-model="information.university"
        :label="$t('form.educationPlace')"
        required
        :rules="requiredRules"
        v-bind="filedProps"
        class="mb-3"
        @keyup="edited"
      />
      <v-row class="px-3">
        <v-checkbox
          v-model="information.hideProfileInfo"
          label="اطلاعاتم برای سایر شرکت کننده ها قابل جستو باشد."
          @change="edited"
        ></v-checkbox>
      </v-row>
      <v-row class="justify-space-between pa-3">
        <v-btn style="flex-basis: 20%">لغو</v-btn>
        <v-btn :disabled="!valid || disable" :loading="loading" type="submit" color="primary" style="flex-basis: 75%">
          <v-icon left>mdi-content-save-outline</v-icon>
          {{ $t('dashboard.editProfile') }}
        </v-btn>
      </v-row>
    </v-form>
  </div>
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
    };
  },
  props: {
    information: Object,
    edited: Function,
    menu: Boolean,
    disable: Boolean,
    loading: Boolean,
    signUp: Function,
  },
  computed: {},
  methods: {},
};
</script>
