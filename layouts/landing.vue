<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
    <call-to-action />
    <my-footer />
  </v-app>
</template>

<script>
import MyFooter from '../components/MyFooter';
import CallToAction from '~/components/CallToAction.vue';
export default {
  components: { MyFooter, CallToAction },
};
</script>

<style></style>
