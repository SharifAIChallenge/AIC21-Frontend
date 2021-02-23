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
    <v-row justify="end" align="center">
      <v-col cols="3">
        <div class="px-3 font-weight-bold trophyTitle" style="padding-bottom:22rem">
          <h2 style="font-size: 5rem">جوایز</h2>
        </div>
      </v-col>
      <v-col cols="3" v-for="(trophy, i) in trophies" :key="i" :style="`margin-top:${trophy.marg}rem`">
        <v-card-text class="d-flex flex-column px-10 text-center white--text">
          <span class="font-weight-black price">{{ trophy.price }}</span>
          <span class="pt-3 text-h4" style="border-top:2px solid white">میلیون تومان</span>
        </v-card-text>
        <v-card-text class="secondary text-center darken-1 font-weight-black py-9">
          <span class="font-weight-black text-h4">{{ trophy.place }}</span>
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
          <span class="white--text font-weight-black d-flex pr-8 plusText">
            دو جایزه رندوم برای تیم های چهارم تا بیستم
            <br />
            دوجایزه ویژه برای مینی گیم ها
          </span>
        </v-card-text>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      trophies: [
        {
          place: 'تیم سوم',
          price: '۶',
          icon: 'mdi-trophy-variant-outline',
          marg: 38,
        },
        {
          place: 'تیم اول',
          price: '۱۲',
          icon: 'mdi-trophy',
          marg: 10,
        },
        {
          place: 'تیم دوم',
          price: '۸',
          icon: 'mdi-trophy-outline',
          marg: 24,
        },
      ],
    };
  },
  props: {
    onIntersecTrophy: Function,
  },
};
</script>

<style lang="scss" scoped>
#trophy {
  margin: 0 auto;
  .price {
    font-size: 9rem;
    margin-bottom: 65px;
  }
  .trophyTitle {
    transform: translateY(-100px);
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
    font-size: 2.3rem;
    line-height: 60px;
    text-align: right;
  }
}
</style>
