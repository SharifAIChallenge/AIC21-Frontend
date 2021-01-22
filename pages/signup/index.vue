<template>
  <div>
    <v-row justify="end" align="center" style="height: 100px" class="mt-n3 px-3 px-sm-5">
      <v-btn rounded large to="/login">
        <v-icon left color="primary">
          mdi-shield-star
        </v-icon>
        {{ $t('form.signIn') }}
      </v-btn>
    </v-row>
    <v-row justify="center" align="center" class="my-3">
      <v-col cols="12" sm="9" md="7" lg="5">
        <v-row justify="center" align="baseline" class="text-uppercase">
          <glow>
            <span class="secondary--text display-3 font-weight-black">
              {{ $t('form.signUp') }}
            </span>
          </glow>
          <glow>
            <span class="text-stroke-primary text-stroke-width-2 transparent--text display-1 font-weight-black">
              {{ $t('form.for') }}
            </span>
          </glow>
        </v-row>
        <v-row justify="center" class="mb-5 mt-1">
          <glow>
            <span class="text-stroke-width-1 transparent--text text-stroke-white display-1 font-family-chopsic">
              AI Challenge
            </span>
          </glow>
        </v-row>
        <v-form ref="form" v-model="valid" @submit.prevent="signUp">
          <v-row>
            <v-col class="py-0" cols="12" sm="6">
              <v-text-field
                v-if="$i18n.locale === 'fa'"
                v-model="form.nameInPersian"
                :label="$t('form.nameInPersian')"
                required
                :rules="requiredRules"
                v-bind="filedProps"
                autofocus
                :error="result.errors.firstname_fa"
                @focus="clearError('firstname_fa')"
              />
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
              <v-text-field
                v-if="$i18n.locale === 'fa'"
                v-model="form.lastNameInPersian"
                :label="$t('form.lastNameInPersian')"
                required
                :rules="requiredRules"
                v-bind="filedProps"
                :error="result.errors.lastname_fa"
                @focus="clearError('lastname_fa')"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="py-0" cols="12" sm="6">
              <v-text-field
                v-model="form.nameInEnglish"
                :label="$t('form.nameInEnglish')"
                required
                :rules="requiredRules"
                v-bind="filedProps"
                dir="ltr"
                :error="result.errors.firstname_en"
                @focus="clearError('firstname_en')"
              />
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
              <v-text-field
                v-model="form.lastNameInEnglish"
                :label="$t('form.lastNameInEnglish')"
                required
                :rules="requiredRules"
                v-bind="filedProps"
                dir="ltr"
                :error="result.errors.lastname_en"
                @focus="clearError('lastname_en')"
              />
            </v-col>
          </v-row>

          <v-row no-gutters justify="center">
            <v-col>
              <v-dialog ref="dialog" v-model="menu" :return-value.sync="form.birthday" width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.birthday"
                    v-bind="filedProps"
                    required
                    :rules="requiredRules"
                    :label="$t('form.birthday')"
                    readonly
                    dir="ltr"
                    :error="result.errors.birth_date"
                    v-on="on"
                    @click="menu = true"
                    @change="clearError('birth_date')"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="form.birthday"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  locale="en-US"
                  scrollable
                  @change="save"
                />
              </v-dialog>

              <v-text-field
                v-model="form.university"
                :label="$t('form.educationPlace')"
                required
                :rules="requiredRules"
                v-bind="filedProps"
                :error="result.errors.university"
                @focus="clearError('university')"
              />

              <v-text-field
                v-model="form.email"
                :label="$t('form.email')"
                type="email"
                :rules="emailRules"
                required
                v-bind="filedProps"
                dir="ltr"
                :error="result.errors.email"
                validate-on-blur
                @focus="clearError('email')"
              />

              <password-input v-model="form.password" />

              <v-alert :type="result.type" :value="result.value" text outlined>
                {{ result.message }}
              </v-alert>

              <v-btn :loading="loading" type="submit" v-bind="primaryButtonProps">
                <v-icon left>
                  mdi-shield-plus-outline
                </v-icon>
                {{ $t('form.signUp') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { emailRules, requiredRules } from '../../mixins/formValidations';
import { primaryButtonProps } from '../../mixins/buttonProps';
import { fieldProps } from '../../mixins/fieldProps';
import Glow from '../../components/Glow';
import PasswordInput from '../../components/PasswordInput';
import { signup } from '../../api';

export default {
  layout: 'form',
  components: { PasswordInput, Glow },
  mixins: [requiredRules, emailRules, primaryButtonProps, fieldProps],
  auth: 'guest',
  data() {
    return {
      valid: false,
      form: {
        nameInPersian: '',
        lastNameInPersian: '',
        nameInEnglish: '',
        lastNameInEnglish: '',
        birthday: '',
        university: '',
        email: '',
        password: '',
      },
      menu: false,
      result: {
        value: false,
        type: 'success',
        message: '',
        errors: {},
      },
      loading: false,
    };
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
      this.loading = true;
      await signup(this.$axios, this.form).then(data => {
        this.loading = false;
        if (data.status_code) {
          if (data.status_code === 200) {
            this.result.message = 'ثبت‌نام با موفقیت انجام شد، برای ادامه ایمیل خود را چک کنید.';
            this.result.type = 'success';
            this.result.value = true;
            this.$refs.form.reset();
          } else {
            this.errors = {};
            this.errors = Object.keys(data.detail).forEach(x => {
              if (x === 'profile') {
                Object.keys(data.detail.profile).forEach(y => this.$set(this.result.errors, y, true));
              } else {
                this.$set(this.result.errors, x, true);
              }
            });
            this.result.message = 'ثبت‌نام با خطا مواجه شد.';
            this.result.type = 'error';
            this.result.value = true;
          }
        }
      });
    },
    clearError(field) {
      if (this.result.errors[field]) {
        this.result.errors[field] = false;
      }
    },
  },
};
</script>

<style scoped></style>
