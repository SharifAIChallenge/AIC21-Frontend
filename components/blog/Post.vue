<template>
  <div class="container">
    <v-card class="mx-auto" max-width="800" elevation="10">
      <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
        <v-card-title>{{ post.title }}</v-card-title>
      </v-img>
      <v-card-title>
        <h4>
          <v-avatar color="teal" size="40">
            <img :src="src" v-if="src" />
            <span class="white--text headline">{{ avAlt }}</span>
          </v-avatar>
          {{ post.author }}
        </h4>
      </v-card-title>
      <v-card-subtitle class="pb-2 pt-0 pr-5">
        {{ post.date }}
      </v-card-subtitle>
      <v-card-text class="text--primary">
        <div>{{ post.description.slice(0, 35) }}...</div>
      </v-card-text>
      <v-row class="mr-2 ml-3 mb-1 pb-2" align="center" justify="end">
        <v-btn color="orange" text @click="$router.push(`blog/${post.slug}`)">رفتن به پست</v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data() {
    const av = this.post.author;
    return {
      avAlt: `${av[0]}${av[1]}`,
      src: '',
    };
  },
};
</script>
<style scoped>
</style>