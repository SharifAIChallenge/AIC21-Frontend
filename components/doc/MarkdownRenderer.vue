<template>
  <div v-html="$md.render(content)" dir="ltr"></div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      content: state => state.doc.content,
    }),
  },
};
</script>

<style></style>
