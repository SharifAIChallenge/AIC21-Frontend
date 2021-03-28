<template>
  <v-container class="post-page" v-if="post.date">
    <v-row class="mb-10">
      <v-col sm="6" cols="12">
        <v-img class="white--text align-end" height="100%" :src="`https://aichallenge.ir${post.image}`"></v-img>
      </v-col>
      <v-col sm="6" cols="12" style="height:100%">
        <v-card flat tile class="transparent">
          <v-card-subtitle class="white--text">
            {{ new Intl.DateTimeFormat($i18n.locale).format(new Date(post.date)) }}
          </v-card-subtitle>
          <h3 class="primary--text text-h3 font-weight-black">
            {{ post.title_fa }}
          </h3>
          <v-card-text class="mb-5 mt-4 font-weight-bold">
            <div v-html="$md.render(post.text_fa)"></div>
          </v-card-text>
          <v-row class="mr-2 ml-3 mb-1 pb-2" align="center" justify="start">
            <!-- <v-col cols="12" class="pa-1">
              <v-btn icon class="red darken-3 ml-1 rounded-0">
                <v-icon class="white--text">mdi-heart</v-icon>
              </v-btn>
              <v-btn class="white--text text--lighten-2" tile outlined @click="copyLink">کپی لینک</v-btn>
            </v-col> -->
            <v-col cols="12" class="pa-1 mt-lg-16">
              <v-btn class="green--text text--darken-3 px-3 py-5" tile outlined @click="copyLink()">
                <v-icon class="white--text">mdi-content-copy</v-icon>
                <span class="mr-2">
                  کپی لینک پست
                </span>
              </v-btn>
              <v-btn class="green--text text--darken-3 px-3 py-5" tile outlined v-if="post.webinar_link" :href="post.webinar_link">
                <v-icon class="white--text">mdi-link</v-icon>
                <span class="mr-2">
                  وبینار
                </span>
              </v-btn>
              <v-btn
                class="green--text text--darken-3 px-3 py-5"
                tile
                outlined
                v-if="post.google_calendar_link"
                :href="post.google_calendar_link"
              >
                <v-icon class="white--text">mdi-calendar</v-icon>
                <span class="mr-2">
                  تقویم گوگل
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="post.is_webinar || isAuthenticated">
      <div class="my-10" v-for="(video, index) in post.aparats" :key="index">
        <div :id="video.aparat_id">
          <script type="text/JavaScript" :src="video.aparat_src"></script>
        </div>
      </div>
    </div>
    <div v-else style="max-width: 500px; margin: auto;">
      <v-btn block color="primary" @click="goToLogin">
        برای دیدن وبینار ابتدا باید وارد شوید
      </v-btn>
    </div>
    <v-row class="mt-15 mb-6" v-if="posts.length">
      <v-col cols="12" class="headline font-weight-black">
        سایر اخبار
      </v-col>
      <v-col lg="3" md="4" sm="4" class="pb-4" v-for="(post, index) in posts" :key="index">
        <app-post :post="post"></app-post>
      </v-col>
    </v-row>
    <CallToAction />
  </v-container>
</template>

<script>
import Buttons from '~/components/blog/Buttons';
import Post from '~/components/blog/Post';
import { getPost, getPosts } from '~/api/blog';
import CallToAction from '~/components/CallToAction.vue';
import { mapState } from 'vuex';

export default {
  components: {
    'app-post-button': Buttons,
    'app-post': Post,
    CallToAction,
  },
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
    goToLogin() {
      this.$store.commit('formStatus/toggleShow');
      this.$store.commit('formStatus/changeStatus', 'login');
    },
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
  },
};
</script>

<style scoped>
.post-page {
  margin-top: 150px;
}
</style>
