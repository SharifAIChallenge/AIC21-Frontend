<template>
  <div>
    <SectionHeader :title="`منابع`" :icon="`mdi-file-document`" />
    <section-container>
      <v-row>
        <v-col cols="12" sm="6" lg="4" xl="3" class="px-2" v-for="(term, index) in terms" :key="index">
          <Terms :term="term" />
        </v-col>
      </v-row>
    </section-container>
  </div>
</template>

<script>
import Terms from '~/components/dashboard/Terms';
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
export default {
  layout: 'dashboard',
  transition: 'fade-transition',
  components: {
    Terms,
    SectionHeader,
    SectionContainer,
  },
  async asyncData({ $axios }) {
    let data = await $axios.$get('/resources/');
    return {
      terms: data.data,
    };
  },
};
</script>

<style scoped></style>
