<template>
  <markdown-renderer />
</template>

<script>
import MarkdownRenderer from '~/components/doc/MarkdownRenderer.vue';
export default {
  components: { MarkdownRenderer },
  auth: false,
  layout: 'doc',
};
</script>

<style></style>
