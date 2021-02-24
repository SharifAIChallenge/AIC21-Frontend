<template>
  <v-card tile flat class="secondary my-5 py-md-15 py-3">
    <div class="d-flex justify-start align-center flex-wrap px-5 px-md-12">
      <v-col cols="6" md="3" v-for="(stat, i) in stats" :key="i">
        <v-card-text class="pl-md-15 py-md-5 p-0 text-right mx-auto">
          <v-icon size="75px" right class="mb-7 black--text align-right statisticsIcon">{{ stat.icon }}</v-icon>
          <h1 class="part mb-12 mt-5 font-weight-bold">{{ stat.part }}</h1>
          <span class="pt-1 text-md-h4 text-h5 statisticsTitle" style="border-top:2px solid white">{{ stat.info }}</span>
        </v-card-text>
      </v-col>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      stats: [
        {
          icon: 'mdi-clipboard-account',
          part: '۳۸۲',
          info: 'شرکت کننده',
        },
        {
          icon: 'mdi-account-group',
          part: '۳۸۲',
          info: 'تیم',
        },
        {
          icon: 'mdi-code-braces-box',
          part: '۳۸۲',
          info: 'ارسال کد',
        },
        {
          icon: 'mdi-sword-cross',
          part: '۳۸۲',
          info: 'نبرد',
        },
      ],
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
