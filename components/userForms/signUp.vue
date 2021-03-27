<template>
  <div class="main">
    <div class="main-sign-up-form container">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <div class="sign-up-title">
            <v-icon right size="55px" color="wihte">mdi-shield-plus-outline</v-icon>
            {{ $t('form.signUp') }}
          </div>
          <v-alert :type="result.type" :value="result.value" text outlined>
            {{ result.message }}
          </v-alert>
        </v-col>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" @submit.prevent="signUp">
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
              class="autofill-bg"
              @focus="clearError('email')"
            ></v-text-field>

            <v-text-field
              label="شماره تلفن"
              v-model="form.phone_number"
              required
              outlined
              dir="ltr"
              class="autofill-bg"
              height="36px"
              :rules="phoneRules"
              validate-on-blur
            ></v-text-field>

            <password-input v-model="form.password_1" />
            <password-input v-model="form.password_2" label="form.passwordRepeat" />
            <!-- <v-checkbox
              required
              outlined
              v-model="termsAndConditions"
              :rules="requiredRules"
              :label="$t('form.termsAndConditions')"
            ></v-checkbox> -->
            <v-row>
              <v-col>
                <v-btn
                  block
                  :disabled="!valid"
                  :loading="loading"
                  type="submit"
                  color="primary"
                  height="50px"
                  style="border-radius: 0; font-weight: normal"
                >
                  {{ $t('form.signUp') }}
                </v-btn>
                <div class="my-6">
                  <div class="or-separator"><span class="px-3">یا</span></div>
                </div>
                <v-btn @click="loginWithGoogle" block color="primary" height="50px" style="border-radius: 0; font-weight: normal">
                  <v-icon style="margin: 5px" size="25px">mdi-google</v-icon>
                  {{ $t('form.signUpWithGoogle') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </div>
    <v-btn color="secondary" class="login-btn" height="50px" @click="changeStatus('login')">
      <v-icon style="margin: 5px" size="25px">mdi-shield-star</v-icon>
      {{ $t('form.signIn') }}
    </v-btn>
  </div>
</template>

<script>
import { emailRules, requiredRules, phoneRules } from '../../mixins/formValidations';
import PasswordInput from '../../components/PasswordInput';
import { signup } from '../../api';
import { sendGoogleAuthCode } from '~/api/auth';

export default {
  components: { PasswordInput },
  mixins: [requiredRules, emailRules, phoneRules],

  data() {
    return {
      showPassword: false,
      valid: false,
      form: {
        email: '',
        password_1: '',
        password_2: '',
        phone_number: '',
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
      let isFormValid = true;
      for (const key in this.form) {
        if (!this.form[key]) isFormValid = false;
      }
      if (!isFormValid) return;
      if (this.form.password_1 !== this.form.password_2) {
        this.$toast.error('رمزهای عبور همخوانی ندارند');
        return;
      }
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

            if (x === 'email') {
              if (data.detail[x][0] === 'This field must be unique.') this.result.message = 'ایمیل تکراری است';
              else if (data.detail[x][0] === 'Enter a valid email address.') this.result.message = 'فرمت ایمیل معتبر نمی‌باشد';
            }
          });

          this.result.type = 'error';
          this.result.value = true;
        }
      }
    },
    async loginWithGoogle() {
      const googleUser = await this.$gAuth.signIn();
      const googleData = googleUser.getAuthResponse();
      const { id_token, access_token, scope, expires_in, expires_at } = googleData;
      let res = await sendGoogleAuthCode(this.$axios, { access_token, id_token, scope, expires_in, expires_at });
      if (res.status_code === 400) {
        this.$toast.error('لاگین با خطا مواجه شد');
      } else {
        this.$store.commit('auth/setToken', res);
        this.$router.push('/dashboard');
        this.$store.commit('formStatus/toggleShow');
        this.$cookies.set('token', res.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
      }
      this.$store.commit('formStatus/toggleShow');
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
@import '~/assets/mixins.scss';
.or-separator {
  width: 100%;
  display: flex;
  align-items: center;

  &::after,
  &::before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #ffffff;
  }
}

.main-sign-up-form {
  margin: auto;
  margin-bottom: 150px;
  max-width: 500px;
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
  right: 0;
  border-radius: 0;
  width: calc(100% - 17px);
  @include v-not-md {
    width: 100%;
  }
}
</style>
