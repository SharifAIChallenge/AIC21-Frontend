<template>
  <div>
    <div v-for="(post, index) in posts" :key="index">
      <nuxt-link :to="post.slug">
        {{ post.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      posts: [
        {
          title: 'asdf asdfad asdfa1',
          slug: 'asdf-asdfad-asdfa',
        },
        {
          title: 'asdf asdfad asdfa2',
          slug: 'asdf-asdfad',
        },
        {
          title: 'asdf asdfad asdfa3',
          slug: 'asdf-asdfad-asdfa2',
        },
        {
          title: 'asdf asdfad asdfa4',
          slug: 'asdf-asdfad-asdfa3',
        },
      ],
    };
  },
};
</script>

<style></style>
