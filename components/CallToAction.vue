<template>
  <v-card flat tile class="call_to_action transparent mx-auto">
    <img src="logo__white.svg" class="background-logo"/>
    <v-row class="mb-16">
      <v-col cols="5" class="align-start justify-center" style="z-index:1">
        <div class="d-flex flex-column align-end justify-center pl-5" style="height:100%">
          <div class="font-weight-bold text-sm-h4 text-h6 mb-1">همین حالا</div>
          <div class="primary--text font-weight-bold text-sm-h2 text-h4 mb-1">ثبت نام</div>
          <div class="font-weight-blod text-sm-h4 text-h6 mb-1">کنید</div>
        </div>
      </v-col>
      <v-col cols="7" class="align-start justify-center px-3">
        <v-btn
          @click="loginWithGoogle"
          tile
          x-large
          class="primary my-3 white--text text-center font-weight-bold"
          style="width:calc(100% - 12px)"
        >
          <v-icon>mdi-google</v-icon>
          ثبت نام باگوگل
        </v-btn>
        <v-btn @click="toggleShow" tile x-large class="black white--text my-3 text-center font-weight-bold" style="width:calc(100% - 12px)">
          ثبت نام با ایمیل و رمز عبور
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    loginWithGoogle() {
      this.$auth.loginWith('google');
    },
    toggleShow() {
      this.$store.commit('formStatus/toggleShow');
      this.$store.commit('formStatus/changeStatus', 'signUp');
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
.call_to_action{
  max-width:750px;
  position:relative;
  padding-top: 0px;
  padding-bottom: 200px;
  margin-top: 16rem;
  overflow: hidden;
}
</style>
