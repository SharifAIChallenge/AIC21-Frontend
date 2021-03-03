<template>
    <v-card class="mx-auto" max-width="800" tile flat :elevation="cardEval" @mousemove="cardEval=24" @mouseleave="cardEval=0" :to="`/blog/${post.id}`"> 
      <v-img class="white--text align-end" height="200px" :src="`https://aichallenge.sharif.edu/${post.image}`">
      </v-img>
      <v-card-subtitle class="primary--text pb-1 pt-2 pr-1">
          {{
              new Intl.DateTimeFormat($i18n.locale).format(
                new Date(post.date)
              )
            }}
      </v-card-subtitle>
      <v-card-title class="pr-1">
        {{post.title_fa}}
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