<template>
  <v-container
    tile
    flat
    class="transparent"
    id="trophy"
    v-intersect="{
      handler: onIntersecTrophy,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <div class="font-weight-bold trophyTitle">
      <h2 class="font-weight-bold" style="font-size: 5rem">جوایز</h2>
    </div>
    <v-row>
      <v-col cols="4" v-for="(trophy, i) in data" :key="i" :style="`margin-top:${trophy.marg}rem`">
        <v-card-text class="d-flex flex-column px-10 text-center white--text">
          <span class="font-weight-black price">{{ trophy.prize_fa }}</span>
          <span class="pt-3 text-h4" style="border-top:2px solid white">میلیون تومان</span>
        </v-card-text>
        <v-card-text class="secondary text-center darken-1 font-weight-black py-9">
          <span class="font-weight-black text-h4">{{ trophy.title_fa }}</span>
        </v-card-text>
        <v-card-text class="secondary text-center pb-0 px-0 iconWraper">
          <v-icon size="200px" class="black--text icon">{{ trophy.icon }}</v-icon>
        </v-card-text>
      </v-col>
    </v-row>
    <div justify="start" align="center" class="mt-5 d-flex align-center justify-start">
      <div class="pl-0">
        <v-card-text class="d-flex justify-center primary text-center plus align-center">
          <v-icon size="15rem" class="black--text" width="100%">mdi-plus</v-icon>
        </v-card-text>
      </div>
      <div class="pr-0">
        <v-card-text>
          <span class="white--text d-flex pr-8 plusText">
            دو جایزه رندوم برای تیم‌های
            <br />
            چهارم تا بیستم
            <br />
            یک جایزه ویژه برای مینی‌گیم‌ها
          </span>
        </v-card-text>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    data() {
      return [
        {
          ...this.trophies[1],
          icon: 'mdi-trophy-variant-outline',
          marg: 17,
        },
        {
          ...this.trophies[0],
          icon: 'mdi-trophy',
          marg: 0,
        },
        {
          ...this.trophies[2],
          icon: 'mdi-trophy-outline',
          marg: 9,
        },
      ];
    },
  },
  props: {
    onIntersecTrophy: Function,
    trophies: Array,
  },
};
</script>

<style lang="scss" scoped>
#trophy {
  margin: 200px auto;
  .price {
    font-size: 9rem;
    margin-bottom: 65px;
  }
  .trophyTitle {
    margin-bottom: 100px;
  }
  .iconWraper {
    padding-top: 100px;
    .icon {
      color: #0e1224 !important;
      transform: translateY(18px);
    }
  }
  .plus {
    width: 270px;
    height: 270px;
    i {
      color: #0e1224 !important;
    }
  }
  .plusText {
    font-size: 1.5rem;
    line-height: 60px;
    text-align: right;
  }
}
</style>
