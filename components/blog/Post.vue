<template>
  <div>
    <h2>{{ post.title }}</h2>
    <h4>
      <v-avatar color="teal" size="45">
        <img :src="src" v-if="src" />
        <span class="white--text headline">{{ avAlt }}</span>
      </v-avatar>
      {{ post.author }}
    </h4>
    <p>{{ post.description.slice(0, 32) }}...</p>
    <p>
      <i>{{ post.date }}</i>
    </p>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data() {
    const av = this.post.author;
    return {
      avAlt: `${av[0]}${av[1]}`,
      src: '',
    };
  },
};
</script>