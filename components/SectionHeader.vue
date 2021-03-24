<template>
  <h1 class="px-6 px-md-12 section-header">
    <v-icon large color="primary" class="ml-4">
      {{ icon }}
    </v-icon>
    <div class="text-h5 text-md-h4 font-weight-bold">
      {{ title }}
    </div>
    <slot></slot>
  </h1>
</template>

<script>
export default {
  props: ['title', 'icon'],
};
</script>

<style lang="scss" scoped>
@import 'assets/mixins.scss';
.section-header {
  height: 90px;
  display: flex;
  align-items: center;
  @include v-not-md {
    height: auto;
    min-height: 60px;
    padding: 20px;
  }
}
</style>
