<template>
  <v-card
    tile
    flat
    class="transparent my-15"
    id="trophyM"
    v-intersect="{
      handler: onIntersecTrophy,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <v-row>
      <h2 class="px-10 mb-10" style="font-size: 3rem">جوایز</h2>
    </v-row>
    <v-row v-for="(trophy, i) in data" :key="i" class="trophyMobWraper">
      <v-col :cols="trophy.col">
        <v-card-text class="d-flex justify-center px-0 pl-4 secondary text-center darken-1" style="height:200px">
          <div class="d-flex align-end font-weight-black trophyMobTitle" style="transform: rotate(90deg);font-size: 1.5rem">
            {{ trophy.title_fa }}
          </div>
        </v-card-text>
        <v-card-text class="d-flex justify-end secondary text-start iconWraper">
          <v-icon size="4rem" class="black--text justify-left icon">{{ trophy.icon }}</v-icon>
        </v-card-text>
      </v-col>
      <div class="d-flex justify-center align-center">
        <v-card-text class="d-flex flex-column pl-15 text-center white--text">
          <span class="text-h1 font-weight-black">{{ trophy.prize_fa }}</span>
          <span style="border-top:2px solid white" class="pt-2 text-h6">میلیون تومان</span>
        </v-card-text>
      </div>
    </v-row>
    <v-row>
      <v-row justify="start" align="center" class="mx-0 mt-0">
        <v-col cols="4" class="px-3 pl-4">
          <v-card-text class="justify-center py-10 primary text-center plus">
            <v-icon size="4rem" class="black--text" width="100%">mdi-plus</v-icon>
          </v-card-text>
        </v-col>
        <v-col cols="8" class="pr-0">
          <v-card-text>
            <span class="white--text font-weight-black text-body-1">
              دو جایزه رندوم برای تیم‌های
              <br />
              چهارم تا بیستم
              <br />
              یک جایزه ویژه برای مینی‌گیم‌ها
            </span>
          </v-card-text>
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>

<script>
export default {
  computed: {
    data() {
      return [
        {
          ...this.trophies[0],
          icon: 'mdi-trophy',
          col: 6,
        },
        {
          ...this.trophies[2],
          icon: 'mdi-trophy-outline',
          col: 5,
        },
        {
          ...this.trophies[1],
          icon: 'mdi-trophy-variant-outline',
          col: 4,
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
<style scoped lang="scss">
.trophyMobWraper {
  justify-content: space-between;
  &:nth-of-type(2) {
    .trophyMobTitle {
      padding-bottom: 30px;
    }
  }
  &:nth-of-type(3) {
    .trophyMobTitle {
      padding-bottom: 40px;
    }
  }
  &:nth-of-type(4) {
    > div > div:nth-of-type(2) {
      justify-content: center !important;
    }
    .trophyMobTitle {
      padding-bottom: 50px;
    }
  }
  .iconWraper {
    padding: 0 !important;
    .icon {
      color: #0e1224 !important;
      padding: 7px 15px;
    }
  }
}
.plus i {
  color: #0e1224 !important;
}
</style>
