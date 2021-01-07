<template>
  <div>
    <div v-for="(post, index) in posts" :key="index">
      <nuxt-link :to="`blog/${post.slug}`">
        <app-post :post="post"></app-post>
      </nuxt-link>
      <hr>
    </div>
  </div>
</template>

<script>
import Post from '../../components/blog/Post';
export default {
  auth: false,
  data() {
    return {
      posts: [
        {
          id: '#1',
          title: 'First Post',
          author: 'saman',
          description: '#1-post for blog in the AIC-2021',
          date: '2-days-ago',
          slug: 'post-number-1',
        },
        {
          id: '#2',
          title: 'Second Post',
          author: 'mohammad',
          description: '#2-post for blog in the AIC-2021',
          date: '2-days-ago',
          slug: 'post-number-2',
        },
        {
          id: '#3',
          title: 'Third Post',
          author: 'ali',
          description: '#3-post for blog in the AIC-2021',
          date: '2-days-ago',
          slug: 'post-number-3',
        },
      ],
    };
  },
  components: {
    'app-post': Post,
  },
};
</script>

<style></style>
