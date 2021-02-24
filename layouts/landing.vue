<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>

    <my-footer />
  </v-app>
</template>

<script>
import MyFooter from '../components/MyFooter';

export default {
  components: { MyFooter },
};
</script>

<style></style>
