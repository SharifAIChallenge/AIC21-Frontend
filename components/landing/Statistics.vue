<template>
  <v-card tile flat class="secondary my-5 py-md-15 py-3">
    <v-row class="d-flex justify-center align-center flex-wrap px-5 px-md-12">
      <v-col md="4" xl="2" v-for="(stat, i) in stats" :key="i">
        <v-card-text class="pl-md-15 py-md-5 p-0 text-right mx-auto">
          <v-icon size="75px" right class="mb-7 black--text align-right statisticsIcon">{{ stat.icon }}</v-icon>
          <h1 class="part mb-12 mt-5 font-weight-bold">{{ stat.stat }}</h1>
          <span class="pt-1 text-md-h4 text-h5 statisticsTitle" style="border-top:2px solid white">{{ stat.title }}</span>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  async fetch() {
    let data = await this.$axios.$get('homepage/stat');
    this.stats = data.data;
  },
  data() {
    return {
      stats: [],
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../assets/mixins.scss';

.part {
  font-size: 5rem;
  white-space: nowrap;
  @include not-md {
    font-size: 3rem;
  }
}
.statisticsIcon {
  color: #0e1224 !important;
  align-items: flex-start !important;
}
.statisticsTitle {
  white-space: nowrap;
}
</style>
