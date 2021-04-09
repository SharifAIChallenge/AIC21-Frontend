<template>
  <v-card
    tile
    flat
    class="pb-4 transparent"
    :elevation="cardEval"
    @mousemove="cardEval = 24"
    @mouseleave="cardEval = 0"
    :to="`/blog/${post.id}`"
  >
    <v-img class="white--text align-end" height="200px" style="max-height: 80vh" :src="`https://aichallenge.ir${post.image}`"></v-img>
    <v-card-subtitle class="primary--text pb-1 pt-2 pr-3">
      {{ new Intl.DateTimeFormat($i18n.locale).format(new Date(post.date)) }}
    </v-card-subtitle>
    <h6 class="mb-8 pr-3 pl-5 text-h6 font-weight-black">
      {{ post.title_fa }}
    </h6>
  </v-card>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      cardEval: 0,
    };
  },
};
</script>
<style>
.v-dialog--fullscreen {
  background: #0e1224;
}
</style>
