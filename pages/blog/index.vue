<template>
  <v-app>
    <v-row class="my-5 mx-1">
      <v-col cols="12">    
      <div class="text--start font-weight-black display-2">اخبار</div>
      </v-col>
      <v-col xs='12' sm="6" md="6" lg="4" xl='3' v-for="(post, index) in posts" :key="index">
      <app-post :post="post" class="pb-15"></app-post>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { posts } from './posts';
import Post from '~/components/blog/Post';

export default {
  auth: false,
  data() {
    return {
      posts,
    };
  },
  components: {
    'app-post': Post,
  },
};
</script>

<style scoped>
</style>>
