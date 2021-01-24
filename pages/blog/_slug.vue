<template>
  <div class="container">

    <div><img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" alt="تصویر" height="300px" width="100%"/></div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.author }}</p>
    <p>{{ post.description }}</p>
    <app-post-button></app-post-button>
    <br />
    <v-text-field @keydown.prevent.enter="addComment" v-model="comment" solo placeholder="comment" autocomplete="off"></v-text-field>
    <app-post-comments :comments="this.comments"></app-post-comments>
  </div>
</template>

<script>
import { posts } from './posts';
import Buttons from '../../components/blog/Buttons';
import Comments from '../../components/blog/CommentsBox';
export default {
  auth: false,
  async asyncData({ params }) {
    const slug = params.slug;
    const id=slug[12]-1
    return {
      post: posts[id],
      comment: '',
      comments: [
        {
          author: 'سالار',
          text: 'بسیار زیبا!',
          time: '۲ساعت پیش',
          reply: [{ text: 'متشکر' },{text:'حق با شماست :)'}],
        },
      ],
    };
  },
  methods: {
    addComment() {
      this.comments.push({
        author:'ali',
        text:this.comment,
        time:'2days ago',
        reply:[]
        });
      console.log(this.comments);
      this.comment = '';
    },
  },
  components: {
    'app-post-button': Buttons,
    'app-post-comments': Comments,
  },
};
</script>

<style></style>
