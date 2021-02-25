<template>
  <div>
    <v-carousel v-model="model">
      <v-carousel-item v-for="(history, index) in histories" :key="index">
        <v-sheet height="100%" tile>
          <!-- <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">Slide {{ i + 1 }}</div>
        </v-row> -->
          <v-row>
            <v-col>
              <div class="image-year">
                <img :src="`${history.image}`" :alt="`${history.title_fa}`" />
              </div>
            </v-col>
            <v-col>
              <div class="history-title-fixed">تاریخچه</div>
              <div class="history-date">
                2019
                <!-- {{ history.title_fa }} -->
                </div>
              <span>{{ history.description_fa }}</span>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    {{ histories }}
  </div>
</template>

<script>
import { PastAi } from '~/api/index';

export default {
  auth: false,
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

<style>
.image-year {
  
  height: 100%;
}
.history-title-fixed{
  margin-top: 80px;
  margin-right: 30px;
  font-size: 2.5rem;
}
.history-date{
    margin-top: 5px;
  margin-right: 30px;
  font-size: 6rem;
}
</style>
