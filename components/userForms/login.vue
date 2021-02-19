<template>
  <div class="main">
    <div class="main-login-form container">
      <v-row justify="center" align="center">
        <v-col>
          <div class="login-title">
            <v-icon right size="55px" color="wihte">
              mdi-shield-star
            </v-icon>
            {{ $t('form.signIn') }}
          </div>
          <v-form ref="form" v-model="valid" @submit.prevent="login">
            <v-text-field
              v-model="email"
              :label="$t('form.email')"
              outlined
              dir="ltr"
              type="email"
              :rules="requiredRules"
              required
              autofocus
              validate-on-blur
              height="36px"
            ></v-text-field>
            <password-input v-model="password" />
            <v-row>
              <v-col>
                <a @click="changeStatus('forgot')">{{ $t('form.forgotPassword') }}</a>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn block style="border-radius: 0; font-weight: normal;" :disabled="loading" :loading="loading" type="submit">
                  {{ $t('form.signIn') }}
                </v-btn>
                <div style="text-align: center; margin:10px;">
                  ————— یا —————
                </div>
                <v-btn @click="loginWithGoogle" block color="primary" style="border-radius: 0; font-weight: normal;">
                  <v-icon style="margin:5px" size="25px">mdi-google</v-icon>
                  {{ $t('form.signInWithGoogle') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </div>
    <v-btn width="100%" color="secondary" class="sigin-up-btn" height="50px" @click="changeStatus('signUp')">
      <v-icon style="margin:5px" size="25px">mdi-shield-plus-outline</v-icon>
      {{ $t('form.signUp') }}
    </v-btn>
  </div>
</template>

<script>
import PasswordInput from '../PasswordInput';
import { emailRules, requiredRules } from '../../mixins/formValidations';

export default {
  mixins: [requiredRules, emailRules],
  components: { PasswordInput },
  data() {
    return {
      showPassword: false,
      valid: false,
      email: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    toggleShow() {
      this.$store.commit('formStatus/toggleShow');
    },
    changeStatus(form) {
      this.$store.commit('formStatus/changeStatus', form);
    },
    login() {
      this.loading = true;
      this.$auth
        .loginWith('local', {
          data: {
            username: this.email,
            password: this.password,
          },
        })
        .then(() => (this.loading = false))
        .catch(() => {
          this.loading = false;
          if (!this.$auth.loggedIn) {
            this.$toast.error('ایمیل وجود ندارد یا رمز عبور اشتباه است.');
          } else {
            this.$toast.success('با موفقیت وارد شدید!');
          }
        });
    },
    loginWithGoogle() {
      this.$auth.loginWith('google');
    },
  },
};
</script>

<style lang="scss" scoped>
.main-login-form {
  margin: auto;
  max-width: 500px;
}
.close-btn {
  position: relative;
  font-size: 50px;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--v-primary-base);
  font-size: 55px;
  font-weight: bold;
}
.sigin-up-btn {
  position: fixed;
  font-size: 20px;
  font-weight: normal;
  bottom: 0;
  border-radius: 0;
}
</style>
