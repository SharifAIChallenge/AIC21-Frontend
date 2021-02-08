<template>
    <v-card class="mx-auto" max-width="800" tile flat :elevation="cardEval" @mousemove="cardEval=24" @mouseleave="cardEval=0" @click="$router.push(`blog/${post.slug}`)"> 
      <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      </v-img>
      <v-card-subtitle class="pb-1 pt-2 pr-0">
        {{ post.date }}
      </v-card-subtitle>
      <v-card-title class="pr-0">
        {{post.title}}
      </v-card-title>
      <!-- <v-card-text class="text--primary">
        <div>{{ post.description.slice(0, 35) }}...</div>
      </v-card-text>
      <v-row class="mr-2 ml-3 mb-1 pb-2" align="center" justify="end">
        <v-btn color="orange" text @click="$router.push(`blog/${post.slug}`)">رفتن به پست</v-btn>
      </v-row> -->
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