<template>
  <v-container
    id="about"
    v-intersect="{
      handler: onIntersecAbout,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <h1>
      درباره ی
    </h1>
    <h1 class="fight">
      نبرد هوش مصنوعی
    </h1>
    <h1>
      شریف
    </h1>
    <p class="description mt-8">
      {{ post && post.motto }}
    </p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  props: {
    onIntersecAbout: Function,
  },
  async fetch() {
    let description = await this.$axios.$get('homepage/motto');
    this.post = description.data[0];
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/mixins.scss';
div {
  text-align: center;
}
.fight {
  color: var(--v-primary-base);
  font-size: 4.2rem;
  @include not-md {
    font-size: 3rem;
  }
}
.description {
  text-align: center;
  font-size: 1.2rem;
  padding-top: 8px;
  color: #b2b2b6;
}
#about {
  max-width: 45%;
  @include not-md {
    max-width: 90%;
  }
}
</style>
