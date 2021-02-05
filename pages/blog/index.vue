<template>
  <v-app>
    <div class="container">
      <h1 style="text-align: center">پست ها</h1>
    </div>
    <v-row class="my-2 mx-1">
      <v-col sm='12' lg="6" xl='4' v-for="(post, index) in posts" :key="index">
      <app-post :post="post"></app-post>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { posts } from './posts';
import Post from '../../components/blog/Post';

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
