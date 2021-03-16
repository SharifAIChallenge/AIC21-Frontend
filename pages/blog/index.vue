<template>
  <v-app>
    <v-container class="blog">
      <div class="text--start font-weight-bold display-2 primary--text">اخبار</div>
      <v-row class="my-5">
        <v-col sm="12" md="6" lg="4" xl="3" v-for="(post, index) in posts" :key="index">
          <app-post :post="post"></app-post>
        </v-col>
      </v-row>
      <!-- <EmailCallToAction /> -->
      <CallToAction />
    </v-container>
  </v-app>
</template>

<script>
import { getPosts } from '~/api/blog';
import Post from '~/components/blog/Post';
// import EmailCallToAction from '~/components/EmailCallToAction.vue';
import CallToAction from '~/components/CallToAction.vue';

export default {
  components: {
    'app-post': Post,
    CallToAction,
  },
  data() {
    return {
      posts: [],
    };
  },
  async asyncData({ $axios }) {
    let posts = await getPosts($axios);
    return { posts };
  },
};
</script>

<style scoped>
.blog {
  margin-top: 100px;
}
</style>
