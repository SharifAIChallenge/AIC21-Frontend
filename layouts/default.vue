<template>
  <v-app>
    <Header color="transparent" />
    <v-main>
      <nuxt />
    </v-main>
    <call-to-action />
    <my-footer />
  </v-app>
</template>

<script>
import MyFooter from '../components/MyFooter';
import Header from '~/components/landing/Header.vue';
import CallToAction from '~/components/CallToAction.vue';
export default {
  components: { MyFooter, Header, CallToAction },
};
</script>
