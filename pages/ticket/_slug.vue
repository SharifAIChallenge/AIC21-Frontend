<template>
  <v-container>
    {{ dataa }}
    <!-- {{profile}} -->





  </v-container>
</template>

<script>
export default {
async fetch() {
    console.log(this.$auth.user);
    // this.$axios.$get('homepage/media').then(res => console.log(res));
  },
  data() {
    return {};
  },
  async asyncData({ $axios, params }) {
    const id = await params.slug;
    const dataa = await $axios.$get(`/ticket/${id}`);
    // const profile = this.$auth.user.profile;
    return {
      dataa,
      // profile
    };
  },
};
</script>

<style></style>
