<template>
  <div class="main">
    <div class="main-login-form container">
      <v-row justify="center" align="center">
        <v-col>
          <div class="login-title">
            <v-icon right size="55px" color="wihte">
              mdi-shield-star-outline
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
              :rules="emailRules"
              required
              autofocus
              validate-on-blur
              height="36px"
              aria-autocomplete="email"
              class="autofill-bg"
            ></v-text-field>
            <password-input v-model="password" />
            <v-row>
              <v-col>
                <a @click="changeStatus('forgot')">{{ $t('form.forgotPassword') }}</a>
              </v-col>
            </v-row>

            <v-row class="mb-14 mb-md-0">
              <v-col>
                <v-btn block style="border-radius: 0; font-weight: normal;" :disabled="loading || !valid" :loading="loading" type="submit">
                  {{ $t('form.signIn') }}
                </v-btn>
                <div class="my-6">
                  <div class="or-separator"><span class="px-3">یا</span></div>
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
    <v-btn width="100%" disabled color="secondary" class="sigin-up-btn" height="50px" @click="changeStatus('signUp')">
      <v-icon style="margin:5px" size="25px">mdi-shield-plus-outline</v-icon>
      {{ $t('form.signUp') }}
    </v-btn>
  </div>
</template>

<script>
import PasswordInput from '../PasswordInput';
import { emailRules, requiredRules } from '../../mixins/formValidations';
import { mapState } from 'vuex';
import { sendGoogleAuthCode } from '~/api/auth';

export default {
  mixins: [requiredRules, emailRules],
  components: { PasswordInput },
  data() {
    return {
      showPassword: false,
      valid: false,
      email: '',
      password: '',
    };
  },
  methods: {
    changeStatus(form) {
      this.$store.commit('formStatus/changeStatus', form);
    },
    login() {
      // this.loading = true;
      this.$store.dispatch('auth/login', {
        username: this.email,
        password: this.password,
      });
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
    },
  },
  computed: {
    ...mapState({
      loading: state => state.auth.isLoading,
    }),
  },
};
</script>

<style lang="scss" scoped>
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
  right: 0;
  border-radius: 0;
}
</style>
