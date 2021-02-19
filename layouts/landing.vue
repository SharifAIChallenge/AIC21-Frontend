<template>
  <v-app>
    <v-main>
      <Social />
      <nuxt />
    </v-main>
    <call-to-action />
    <my-footer />
  </v-app>
</template>

<script>
import MyFooter from '../components/MyFooter';
import CallToAction from '~/components/CallToAction.vue';
import Social from '../components/landing/Social.vue';
export default {
  components: { MyFooter, CallToAction, Social },
};
</script>

<style></style>
