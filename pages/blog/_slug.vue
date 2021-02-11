<template>
  <!-- <div class="container">

    <div><img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="تصویر" height="300px" width="100%"/></div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.author }}</p>
    <p>{{ post.description }}</p>
    <app-post-button></app-post-button>
    <br />
    <v-text-field @keydown.prevent.enter="addComment" v-model="comment" solo placeholder="comment" autocomplete="off"></v-text-field>
    <app-post-comments :comments="this.comments"></app-post-comments>
  </div> -->
  <v-container>
    <v-row class="my-8 px-4">
      <v-col sm="6" xs="12">
        <v-img class="white--text align-end" height="100%" :src="`https://aichallenge.sharif.edu/${post.image}`"></v-img>
      </v-col>
      <v-col sm="6" xs="12">
        <v-card flat tile>
          <v-card-subtitle class="white--text">
            {{
              post.date
            }}
          </v-card-subtitle>
          <v-card-title class="primary--text font-weight-black">
            {{post.title_fa}}
          </v-card-title>
          <v-card-text class="mb-5">
            {{ post.text_fa}}
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
      <v-col lg="3" md="4" sm="4" v-for="(post,index) in posts" :key="index">
        <app-post :post="post" class="pb-4"></app-post>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Buttons from '~/components/blog/Buttons';
import Comments from '~/components/blog/CommentsBox';
import Post from '~/components/blog/Post';
import {getPost,getPosts} from '~/api/blog'
export default {
  auth: false,
  data(){
    return{
      posts:[],
      post:{}
    }
  },

  // async asyncData({ params }) {
  //   // const slug = params.slug;
  //   return {
  //     posts,
  //     post: posts[1],
      // slug:params.slug
      // comment: '',
      // comments: [
        //   {
          //     author: 'سالار',
      //     text: 'بسیار زیبا!',
      //     time: '۲ساعت پیش',
      //     reply: [{ text: 'متشکر' }, { text: 'حق با شماست :)' }],
      //   },
      // ],
  //   };
  // },
    async created(){
      const id=await this.$route.params.slug
      console.log(id)
      let postData=await getPost(this.$axios,id)
      let postsData=await getPosts(this.$axios)
      console.log(postData);
      console.log(postsData)
      postData.date=new Intl.DateTimeFormat(this.$i18n.locale).format(
                new Date(postData.date))
      this.posts=postsData
      this.post=postData;
    },
  methods: {
    addComment() {
      this.comments.push({
        author: 'ali',
        text: this.comment,
        time: '2days ago',
        reply: [],
      });
      console.log(this.comments);
      this.comment = '';
    },
  },
  components: {
    'app-post-button': Buttons,
    'app-post-comments': Comments,
    'app-post': Post,
  },
};
</script>

<style></style>
