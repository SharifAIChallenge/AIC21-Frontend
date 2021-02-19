<template>
  <div class="parent">
    <wp-content :html="html" />
  </div>
</template>

<script>
import WpContent from './WpContent';

export default {
  props: ['comment'],
  components: {
    WpContent,
  },
  computed: {
    html() {
      return this.comment;
    },
  },
};
</script>

<style lang="scss">
.parent {
  img {
    max-width: 100%;
  }
}
</style>
