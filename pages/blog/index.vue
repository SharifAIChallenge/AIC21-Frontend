<template>
  <v-app>
    <v-container>
      <div class="text--start font-weight-black display-2 primary--text">اخبار</div>
      <v-row class="my-5 mx-1">
        <v-col sm="12" md="6" lg="4" xl="3" v-for="(post, index) in posts" :key="index">
          <app-post :post="post" class="pb-15"></app-post>
        </v-col>
      </v-row>
    </v-container>
    <app-call></app-call>
  </v-app>
</template>

<script>
import { posts } from './posts';
import Post from '~/components/blog/Post';
import CallToAction from '~/components/CallToAction'
export default {
  auth: false,
  data() {
    return {
      posts,
    };
  },
  components: {
    'app-post': Post,
    'app-call':CallToAction
  },
};
</script>

<style scoped></style>
>
