<template>
  <div class="main">
    <div class="main-sign-up-form container">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <div class="sign-up-title">
            <v-icon right size="55px" color="wihte">
              mdi-shield-plus-outline
            </v-icon>
            {{ $t('form.signUp') }}
          </div>
          <v-alert :type="result.type" :value="result.value" text outlined>
            {{ result.message }}
          </v-alert>
        </v-col>
        <v-col cols="12">
          <form ref="form" @submit.prevent="signUp">
            <v-text-field
              :label="$t('form.email')"
              v-model="form.email"
              type="email"
              :rules="emailRules"
              required
              outlined
              :error="result.errors.email"
              dir="ltr"
              height="36px"
              validate-on-blur
              @focus="clearError('email')"
            ></v-text-field>

            <password-input v-model="form.password_1" style="height:36px" />
            <password-input v-model="form.password_2" style="height:36px" label="form.passwordRepeat" />
            <v-checkbox required outlined v-model="termsAndConditions" :label="$t('form.termsAndConditions')"></v-checkbox>
            <v-row>
              <v-col>
                <v-btn
                  block
                  :disabled="!termsAndConditions"
                  :loading="loading"
                  type="submit"
                  color="primary"
                  height="50px"
                  style="border-radius: 0; font-weight: normal;"
                >
                  {{ $t('form.signUp') }}
                </v-btn>
                <div style="text-align: center; margin:10px;">
                  ————— یا —————
                </div>
                <v-btn @click="loginWithGoogle" block color="primary" height="50px" style="border-radius: 0; font-weight: normal;">
                  <v-icon style="margin:5px" size="25px">mdi-google</v-icon>
                  {{ $t('form.signUpWithGoogle') }}
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </div>
    <v-btn width="100%" color="secondary" class="login-btn" height="50px" @click="changeStatus('login')">
      <v-icon style="margin:5px" size="25px">mdi-shield-star</v-icon>
      {{ $t('form.signIn') }}
    </v-btn>
  </div>
</template>

<script>
import { emailRules, requiredRules } from '../../mixins/formValidations';
import PasswordInput from '../../components/PasswordInput';
import { signup } from '../../api';

export default {
  components: { PasswordInput },
  mixins: [requiredRules, emailRules],

  data() {
    return {
      showPassword: false,
      valid: false,
      form: {
        email: '',
        password_1: '',
        password_2: '',
      },
      result: {
        value: false,
        type: 'success',
        message: '',
        errors: {},
      },
      loading: false,
      termsAndConditions: false,
    };
  },
  methods: {
    toggleShow() {
      this.$store.commit('formStatus/toggleShow');
    },
    changeStatus(form) {
      this.$store.commit('formStatus/changeStatus', form);
    },
    async signUp() {
      this.loading = true;
      let data = await signup(this.$axios, this.form);
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
    },
    loginWithGoogle() {
      // this.$auth.loginWith('google');
    },
    clearError(field) {
      if (this.result.errors[field]) {
        this.result.errors[field] = false;
      }
    },
  },
};
</script>

<style lang="scss">
.main-sign-up-form {
  margin: auto;
  margin-bottom: 150px;
  max-width: 700px;
}
.sign-up-title {
  text-align: center;
  color: var(--v-primary-base);
  font-size: 55px;
  font-weight: bold;
}
.login-btn {
  position: fixed;
  font-size: 25px !important;
  font-weight: normal;
  bottom: 0;
  border-radius: 0;
}
</style>
