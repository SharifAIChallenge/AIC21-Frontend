<template>
  <v-card flat tile class="call_to_action transparent mx-auto">
    <img src="../assets/images/logo/logo__white.svg" class="background-logo" />
    <v-row class="mb-16" justify="space-between">
      <v-col cols="12" sm="5" class="align-start justify-center" style="z-index:1">
        <div class="d-flex flex-column align-center align-sm-end justify-center pl-5" style="height:100%">
          <div class="font-weight-bold text-sm-h4 text-h6 mb-1">همین حالا</div>
          <div class="primary--text font-weight-bold text-sm-h2 text-h5 mb-1">ثبت نام</div>
          <div class="font-weight-blod text-sm-h4 text-h6 mb-1">کنید</div>
        </div>
      </v-col>
      <v-col cols="12" sm="5" class="align-start justify-center px-3">
        <v-btn @click="loginWithGoogle" block tile x-large :disabled="true" class="primary my-3 text-center" style="width:calc(100% - 12px)">
          <v-icon>mdi-google</v-icon>
          ثبت نام با گوگل
        </v-btn>
        <v-btn @click="toggleShow()" tile block x-large :disabled="true" class="black white--text my-3 px-sm-1 text-center" style="width:calc(100% - 12px)">
          ثبت نام با ایمیل و رمز عبور
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { sendGoogleAuthCode } from '~/api/auth';
export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
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
    toggleShow() {
      this.$store.commit('formStatus/changeStatus', 'signUp');
      this.$store.commit('formStatus/toggleShow');
    },
  },
};
</script>

<style scoped>
.background-logo {
  position: absolute;
  top: 0;
  opacity: 0.15;
  z-index: 0;
}
.call_to_action {
  max-width: 750px;
  position: relative;
  padding-top: 6rem;
  padding-bottom: 200px;
  margin-top: 8rem;
  overflow: hidden;
}
</style>
