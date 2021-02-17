<template>
  <v-app>
    <v-main>
      <Social />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Social from '../components/landing/Social.vue'
export default {
  components: {
    Social : Social,
  },
};
</script>

<style></style>
