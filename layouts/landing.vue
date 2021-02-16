<template>
  <v-app>
    <Header />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Header from '~/components/landing/Header.vue';
export default {
  components: { Header },
};
</script>

<style></style>
