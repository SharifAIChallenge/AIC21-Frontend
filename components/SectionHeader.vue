<template>
  <h2>
    <v-icon x-large color="primary">
      {{ icon }}
    </v-icon>
    {{ title }}
  </h2>
</template>

<script>
export default {
  props: ['title', 'icon'],
};
</script>

<style></style>
