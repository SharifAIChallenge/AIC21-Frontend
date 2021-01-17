<template>
  <div>
    <div><img src="" alt="pic" /></div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.author }}</p>
    <p>{{ post.description }}</p>
    <app-post-button></app-post-button>
    <br />
    <v-text-field @keydown.prevent.enter="addComment" v-model="comment" solo placeholder="comment" autocomplete="off"></v-text-field>
  </div>
</template>

<script>
import { posts } from './posts';
import Buttons from '../../components/blog/Buttons';
export default {
  auth: false,
  async asyncData({ params }) {
    const slug = params.slug;
    const index = params.slug.slice(12, 13);
    const post = posts[index - 1];
    return {
      index,
      post: post,
      comment: '',
      // comments:posts[index-1].comments
    };
  },
  methods: {
    addComment() {
      //     console.log(this.post.comments)
      //     posts[this.index-1].comments=[]
      //     posts[this.index-1].comments.push({
      //       text:this.comment,
      //       replies:[]
      //     });
      //     console.log(posts[this.index-1])
      //     console.log(this.comments)
      this.comment = '';
    },
  },
  components: {
    'app-post-button': Buttons,
  },
};
</script>

<style></style>
