<template>
    <v-card class="mx-auto" max-width="800" tile flat :elevation="cardEval" @mousemove="cardEval=24" @mouseleave="cardEval=0" :to="`/blog/${post.slug}`"> 
      <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      </v-img>
      <v-card-subtitle class="primary--text pb-1 pt-2 pr-1">
        {{ post.date }}
      </v-card-subtitle>
      <v-card-title class="pr-1">
        {{post.title}}
      </v-card-title>
    </v-card>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      cardEval:0
    };
  },
};
</script>
<style scoped>
</style>