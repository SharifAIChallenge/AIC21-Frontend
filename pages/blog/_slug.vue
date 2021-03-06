<template>
  <v-container class="post-page" v-if="post.date">
    <v-row class="mb-10">
      <v-col sm="6" cols="12">
        <v-img class="white--text align-end" height="100%" :src="`https://aichallenge.ir${post.image}`"></v-img>
      </v-col>
      <v-col sm="6" cols="12">
        <v-card flat tile>
          <v-card-subtitle class="white--text">
            {{ new Intl.DateTimeFormat($i18n.locale).format(new Date(post.date)) }}
          </v-card-subtitle>
          <v-card-title class="primary--text font-weight-black">
            {{ post.title_fa }}
          </v-card-title>
          <v-card-text class="mb-5">
            <div v-html="$md.render(post.text_fa)"></div>
          </v-card-text>
          <v-row class="mr-2 ml-3 mb-1 pb-2" align="center" justify="start">
            <!-- <v-col cols="12" class="pa-1">
              <v-btn icon class="red darken-3 ml-1 rounded-0">
                <v-icon class="white--text">mdi-heart</v-icon>
              </v-btn>
              <v-btn class="white--text text--lighten-2" tile outlined @click="copyLink">کپی لینک</v-btn>
            </v-col> -->
            <v-col cols="12" class="pa-1">
              <v-btn class="green--text text--darken-3" tile outlined @click="copyLink()">
                <v-icon class="white--text">mdi-content-copy</v-icon>
                <span class="mr-2">
                  کپی لینک پست
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <div class="my-10" v-for="(video, index) in post.aparats" :key="index">
      <div :id="video.aparat_id">
        <script type="text/JavaScript" :src="video.aparat_src"></script>
      </div>
    </div>
    <v-row class="mt-15 mb-6" v-if="posts.length">
      <v-col cols="12" class="headline font-weight-black">
        سایر اخبار
      </v-col>
      <v-col lg="3" md="4" sm="4" class="pb-4" v-for="(post, index) in posts" :key="index">
        <app-post :post="post"></app-post>
      </v-col>
    </v-row>
    <EmailCallToAction />
  </v-container>
</template>

<script>
import Buttons from '~/components/blog/Buttons';
import Post from '~/components/blog/Post';
import { getPost, getPosts } from '~/api/blog';
import EmailCallToAction from '~/components/EmailCallToAction.vue';
export default {
  auth: false,
  data() {
    return {
      posts: [],
      post: {},
    };
  },
  async asyncData({ $axios, params }) {
    const id = await params.slug;
    let post = await getPost($axios, id);
    let posts = await getPosts($axios);
    posts = posts.filter(value => {
      return value.id != id;
    });
    return { posts, post };
  },
  // async fetch() {
  //   let id = this.$route.params.slug;
  //   let post = await getPost(this.$axios, id);
  //   let posts = await getPosts(this.$axios);
  //   posts = posts.filter(value => {
  //     return value.id != id;
  //   });
  //   this.posts = posts;
  //   this.post = post;
  // },
  methods: {
    copyLink() {
      const el = document.createElement('textarea');
      el.value = window.location.href;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$toast.success('لینک پست در کلیپ‌بورد کپی شد');
    },
  },
  components: {
    'app-post-button': Buttons,
    'app-post': Post,
    EmailCallToAction,
  },
};
</script>

<style scoped>
.post-page {
  margin-top: 150px;
}
</style>
