<template>
  <div class="term-card pa-8">
    <v-card-text class="term-card-title align-center px-0">
      <v-icon right color="primary" class="faq-icon" size="33">
        mdi-file-document
      </v-icon>
      {{ term.title }}
    </v-card-text>
    <p class="faq-card-text py-5 px-5">
      {{ term.description }}
    </p>
    <v-btn tile plain link color="primary" v-for="(link,index) in term.links" :key="index" :href="link.url">{{link.title}}</v-btn>
  </div>
</template>

<script>
export default {
  props: ['term'],
};
</script>

<style scoped>
.term-card {
  border: 3px solid var(--v-primary-base);
  padding: 8px;
  height: 100%;
}
.term-card-title {
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
}
</style>
