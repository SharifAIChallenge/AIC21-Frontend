<template>
  <div>
    <div class="container">
      <h1 style="text-align: center">پست ها</h1>
    </div>

    <br />
    <div v-for="(post, index) in posts" :key="index">
      <!-- <nuxt-link class="post_link" :to="`blog/${post.slug}`"> -->
        <app-post :post="post"></app-post>
      <!-- </nuxt-link> -->
    </div>
  </div>
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
.post_link {
  text-decoration: none;
}
</style>>
