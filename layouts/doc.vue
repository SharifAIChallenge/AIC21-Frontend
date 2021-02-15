<template>
  <v-app>
    <tree />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Tree from '~/components/doc/Tree.vue';
export default {
  components: { Tree },
};
</script>

<style></style>
