<template>
  <v-card flat tile class="callToAction transparent mx-auto my-10" style="max-width:750px">
    <v-row>
      <v-col cols="5" class="align-center justify-center">
        <div class="d-flex flex-column align-end justify-center pl-5" style="height:100%">
          <div class="font-weight-bold text-sm-h4 text-h6 mb-1">همین حالا</div>
          <div class="primary--text font-weight-bold text-sm-h2 text-h4 mb-1">ثبت نام</div>
          <div class="font-weight-blod text-sm-h4 text-h6 mb-1">کنید</div>
        </div>
      </v-col>
      <v-col cols="7" class="align-center justify-center px-3">
        <v-btn
          @click="loginWithGoogle"
          plain
          block
          tile
          x-large
          class="primary my-3 white--text text-center font-weight-bold"
          style="width:calc(100% - 12px)"
        >
          <v-icon>mdi-google</v-icon>
          ثبت نام باگوگل
        </v-btn>
        <v-btn
          @click="toggleShow"
          plain
          tile
          block
          x-large
          class="black white--text my-3 text-center font-weight-bold"
          style="width:calc(100% - 12px)"
        >
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

<style lang="scss">
.callToAction {
  .v-btn__content {
    opacity: 1 !important;
  }
}
</style>
