<template>
  <v-container>
    <v-row class="my-8 px-4">
      <v-col sm="6" xs="12">
        <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
      </v-col>
      <v-col sm="6" xs="12">
        <v-card flat tile>
          <v-card-subtitle class="white--text">
            {{ post.date }}
          </v-card-subtitle>
          <v-card-title class="primary--text font-weight-black">
            {{ post.title }}
          </v-card-title>
          <v-card-text class="mb-5">
            {{ post.description }}
          </v-card-text>
          <v-row class="mr-2 ml-3 mb-1 pb-2" align="center" justify="start">
            <v-col cols="12" class="pa-1">
              <v-btn icon class="red darken-3 ml-1 rounded-0">
                <v-icon class="white--text">mdi-heart</v-icon>
              </v-btn>
              <v-btn class="white--text text--lighten-2" tile outlined>کپی لینک</v-btn>
            </v-col>
            <v-col cols="12" class="pa-1">
              <v-btn icon class="red darken-3 ml-1 rounded-0">
                <v-icon class="white--text">mdi-heart</v-icon>
              </v-btn>
              <v-btn class="green--text text--darken-3" tile outlined>کپی لینک</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-3">
      <v-col cols="12" class="headline font-weight-black">
        سایر اخبار
      </v-col>
      <v-col lg="3" md="4" sm="4" v-for="(Opost, index) in posts" :key="index">
        <app-post :post="post" class="pb-4"></app-post>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { posts } from './posts';
import Buttons from '~/components/blog/Buttons';
import Post from '~/components/blog/Post';
export default {
  auth: false,
  async asyncData({ params }) {
    const slug = params.slug;
    const id = slug[12] - 1;
    return {
      posts,
      post: posts[id],
    };
  },
  methods: {},
  components: {
    'app-post-button': Buttons,
    'app-post': Post,
  },
};
</script>

<style></style>
