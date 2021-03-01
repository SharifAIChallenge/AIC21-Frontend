<template>
  <v-card tile flat class="pb-4" :elevation="cardEval" @mousemove="cardEval = 24" @mouseleave="cardEval = 0" :to="`/blog/${post.id}`">
    <v-img class="white--text align-end" height="200px" :src="`https://aichallenge.ir${post.image}`"></v-img>
    <v-card-subtitle class="primary--text pb-1 pt-2 pr-3">
      {{ new Intl.DateTimeFormat($i18n.locale).format(new Date(post.date)) }}
    </v-card-subtitle>
    <div class="my-4 pr-3 text-h6">
      {{ post.title_fa }}
    </div>
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
<style scoped></style>
