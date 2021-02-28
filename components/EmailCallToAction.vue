<template>
  <v-container flat tile class="call_to_action transparent mx-auto">
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
        <v-btn @click="submit" tile block x-large style="max-width: 400px; margin: auto" class="black white--text my-3 px-sm-1 text-center">
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
    };
  },
  async fetch() {
    // console.log(this.$auth.user);
    // this.$axios.$get('homepage/media').then(res => console.log(res));
  },
  methods: {
    submit() {
      this.$axios.$post('/homepage/subscribe', { email: this.email });
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
