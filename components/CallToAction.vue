<template>
  <v-card flat tile class="transparent mx-auto callToAction">
    <v-row class="mb-15">
      <v-col cols="6" class="align-center justify-center">
        <div class="d-flex flex-column align-end justify-center pl-5" style="height:100%">
          <div class="font-weight-bold text-sm-h4 text-h6 mb-1">همین حالا</div>
          <div class="primary--text font-weight-bold text-sm-h2 text-h4 mb-1">ثبت نام</div>
          <div class="font-weight-blod text-sm-h4 text-h6 mb-1">کنید</div>
        </div>
      </v-col>
      <v-col cols="6" class="align-center justify-center px-3">
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
          class="black white--text my-3 px-sm-1 text-center font-weight-bold"
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
    return {
      active: false,
    };
  },
  methods: {
    loginWithGoogle() {
      this.$auth.loginWith('google');
    },
    toggleShow() {
      this.$store.commit('formStatus/toggleShow');
      this.$store.commit('formStatus/changeStatus', 'signUp');
    },
    activeBtn() {
      this.active = !this.active;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/mixins.scss';

.callToAction {
  max-width: 750px;
  margin: 16vmin auto 10vmin;
  .v-btn__content {
    opacity: 1 !important;
  }
}
.activeBox p {
  font-size: 18px;
  white-space: nowrap;
  @include not-md {
    font-size: 12px;
  }
}
</style>
