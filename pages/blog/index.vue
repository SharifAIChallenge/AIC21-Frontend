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
  </v-app>
</template>

<script>
import { getPosts } from '~/api/blog';
import { posts } from './posts';
import Post from '~/components/blog/Post';

export default {
  auth: false,
  data() {
    return {
      posts:[],
    };
  },
  async created(){
    let data =await getPosts(this.$axios)
    console.log(data)
    this.posts=data;
  },
  components: {
    'app-post': Post,
  },
};
</script>

<style scoped></style>

