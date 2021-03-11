<template>
  <div class="history">
    <Header color="transparent" />
    <div class="wrapper">
      <v-container class="pb-10" style="position:relative">
        <div
          class="d-flex justify-center"
          style=" 
          position: absolute;
          bottom: 30px;
          z-index: 10;
          width:100%;
          "
        >
          <div
            class="white d-inline-block"
            style="width: 44%;
                   height: 3px;
                   position: absolute;
                   right: 28%;
                   margin-top: 4px;
                   z-index: -1;"
          ></div>
          <div
            class="d-inline-block px-5"
            v-for="(year, index) in years"
            :key="index"
            :class="index == model ? 'font-weight-black' : ''"
            @click="model = index"
            style="cursor:pointer"
          >
            <div
              class="white mx-auto"
              :style="index == model ? 'height:13px;width:13px;margin-bottom:17px' : 'height:10px;width:10px;margin-bottom:20px'"
              style="border-radius:50%"
            ></div>
            <span :style="index == model ? '' : 'opacity:0.6'">
              {{ year }}
            </span>
          </div>
        </div>
        <v-carousel
          hide-delimiter-background
          hide-delimiters
          :cycle="false"
          :continuous="false"
          v-model="model"
          height="100%"
          style="background: black;"
          class="carousel"
        >
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
                <v-col cols="12" md="5">
                  <div class="image-year">
                    <img :src="`${history.image}`" :alt="`${history.title_fa}`" width="100%" height="280px" />
                  </div>
                </v-col>
                <v-col cols="12" md="7" class="pr-2">
                  <div class="history-date text-h5 text-sm-h4 px-3">
                    {{ history.title_fa }}
                    <!-- {{ history.event_year }} -->
                  </div>
                  <p class="history-detail px-3">{{ history.description_fa }}</p>
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
    let histories = data.data.sort((a, b) => a.event_year - b.event_year);
    let years = histories.map(el => {
      return el.event_year;
    });
    return {
      histories,
      years,
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
@import '../assets/mixins.scss';
.history {
  min-height: 100vh;
  background: black;
  #header {
    height: 110px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    // height: 100vh;
    .carousel {
      position: relative;
      padding-bottom: 100px;
      .v-window__prev,
      .v-window__next {
        z-index: 100;
        top: calc(100% + 57px);
        @include not-md {
          margin: 0;
          button {
            padding: 0;
            font-size: 12px;
          }
        }
      }
    }
    .v-item-group button {
      @include not-md {
        margin: 2px !important;
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
.history-team {
  margin-top: 10px;
  margin-bottom: 20px;
}
li {
  margin: 10px;
}
</style>
