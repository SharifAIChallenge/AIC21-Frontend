<template>
  <div class="history">
    <Header color="transparent" />
    <div class="wrapper">
      <v-container class="pb-4">
        <v-carousel hide-delimiter-background v-model="model" height="100%" style="background: black" class="pb-8 carousel">
          <template v-slot:prev="{ on, attrs }">
            <v-btn v-bind="attrs" color="black" v-on="on" class="arrow-btn ">
              <v-icon class="ml-2">
                mdi-arrow-right
              </v-icon>
              <span>سال قبل</span>
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn v-bind="attrs" color="black" v-on="on" class="arrow-btn ">
              <span>سال بعد</span>
              <v-icon class="mr-2">
                mdi-arrow-left
              </v-icon>
            </v-btn>
          </template>
          <v-carousel-item v-for="(history, index) in histories" :key="index">
            <v-sheet height="100%" tile>
              <v-row class="pb-8" style="background: black">
                <v-col cols="12" md="6">
                  <div class="image-year">
                    <img :src="`${history.image}`" :alt="`${history.title_fa}`" width="100%" />
                  </div>
                </v-col>
                <v-col cols="12" md="6" class="pr-8">
                  <div class="history-title-fixed">تاریخچه</div>
                  <div class="history-date text-h2 text-sm-h1">
                    {{ history.title_fa }}
                  </div>
                  <span class="history-detail text-h6">• {{ history.description_fa }}</span>
                  <ol class="history-team">
                    <li>نیم اول: {{ history.firstTeam }}</li>
                    <li>تیم دوم: {{ history.secondTeam }}</li>
                    <li>تیم سوم: {{ history.thirdTeam }}</li>
                  </ol>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </div>
  </div>
</template>

<script>
import { PastAi } from '~/api/index';
import Header from '~/components/landing/Header.vue';
export default {
  layout: 'landing',
  auth: false,
  components: { Header },
  async asyncData({ $axios }) {
    let data = await PastAi($axios);
    let histories = data.data;
    return {
      histories,
    };
  },
  data() {
    return {
      model: 0,
    };
  },
};
</script>

<style lang="scss">
.history {
  min-height: 100vh;
  background: black;
  .wrapper {
    display: flex;
    align-items: center;
    height: 100vh;
    .carousel {
      position: relative;
      .v-window__prev,
      .v-window__next {
        z-index: 100;
        top: 98.5%;
        bottom: 0;
      }
    }
  }
}
.image-year {
  display: flex;
  max-width: 100%;
  align-items: center;
  height: 100%;
}
.history-title-fixed {
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 2.5rem;
}
.history-date {
  margin-right: 10px;
}
.history-detail {
}
.history-team {
  margin-top: 10px;
  margin-bottom: 20px;
}
li {
  margin: 10px 0px 10px 10px;
}
</style>
