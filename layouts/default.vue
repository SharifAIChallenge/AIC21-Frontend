<template>
  <v-app>
    <Header color="transparent" />
    <v-main>
      <nuxt />
    </v-main>
    <EmailCallToActionn />
    <my-footer />
  </v-app>
</template>

<script>
import MyFooter from '../components/MyFooter';
import Header from '~/components/landing/Header.vue';
import EmailCallToAction from '~/components/EmailCallToAction.vue';
export default {
  components: { MyFooter, Header, EmailCallToAction },
};
</script>
