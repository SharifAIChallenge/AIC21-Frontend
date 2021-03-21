<template>
  <v-container flat tile class="call_to_action transparent mx-auto" id="CallToAction">
    <img src="logo__white.svg" class="background-logo" />
    <v-row class="mb-16" justify="space-between">
      <v-col cols="12" sm="5" class="align-start justify-center" style="z-index:1">
        <div class="d-flex flex-column align-center align-sm-end justify-center " style="height:100%">
          <div class="font-weight-bold  text-h4 mb-1">همین حالا</div>
          <div class="primary--text font-weight-bold text-sm-h2 text-h3 mb-1">ثبت نام</div>
          <div class="font-weight-bold  text-h4 mb-1">کنید</div>
        </div>
      </v-col>
      <v-col cols="12" sm="5" class="align-start justify-center">
        <v-text-field :label="$t('form.email')" dir="ltr" type="email" outlined v-model="email"></v-text-field>
        <v-btn
          @click="submit"
          :disabled="loading"
          tile
          block
          x-large
          style="max-width: 400px; margin: auto"
          class="black white--text my-3 px-sm-1 text-center"
        >
          عضویت در خبرنامه
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      loading: false,
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.$axios.$post('/homepage/subscribe', { email: this.email }).then(res => {
        this.loading = false;
        if (res.status_code === 200) this.$toast.success('ایمیل شما با موفقیت ثبت شد');
        else this.$toast.error('ایمیل شما تکراری یا نامعتبر است');
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/mixins.scss';
.background-logo {
  position: absolute;
  top: -100px;
  opacity: 0.15;
  z-index: 0;
  transform: scale(0.63) translateY(-100px);
  @include not-sm {
    top: 0px;
    transform: translateY(100px);
  }
}
.action-btn {
  position: relative;
  z-index: 1000;
}
.action-btn {
  position: relative;
  z-index: 1000;
}
.call_to_action {
  max-width: 750px;
  position: relative;
  padding-top: 10rem;
  padding-bottom: 200px;
  margin-top: 14rem;
  overflow: hidden;
  height: 100vh;
}
</style>
