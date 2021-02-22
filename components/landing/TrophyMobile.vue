<template>
  <v-card
    tile
    flat
    class="transparent my-15"
    id="trophy"
    v-intersect="{
      handler: onIntersecTrophy,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <v-row v-for="(trophy, i) in trophies" :key="i">
      <v-col :cols="trophy.col" :class="`pl-${trophy.col}`">
        <v-card-text class="d-flex justify-center px-0 pl-4 secondary text-center darken-2" style="height:140px">
          <div class="d-flex align-end  font-weight-black text-body-1" style="transform: rotate(90deg)">{{ trophy.place }}</div>
        </v-card-text>
        <v-card-text class="d-flex justify-end secondary text-start pb-0">
          <v-icon size="2rem" class="black--text justify-left">{{ trophy.icon }}</v-icon>
        </v-card-text>
      </v-col>
      <v-col :cols="12 - trophy.col" class="d-flex justify-center align-center">
        <v-card-text class="d-flex flex-column px-10 text-center white--text" style="width:170px">
          <span class="text-h3 font-weight-black">{{ trophy.price }}</span>
          <span style="border-top:1px solid white">میلیون تومان</span>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row>
      <v-row justify="start" align="center" class="mx-0 mt-0">
        <v-col cols="4" class="px-3 pl-4">
          <v-card-text class="justify-center py-10 primary text-center">
            <v-icon size="2rem" class="black--text" width="100%">mdi-plus</v-icon>
          </v-card-text>
        </v-col>
        <v-col cols="8" class="pr-0">
          <v-card-text>
            <span class="white--text font-weight-black text-body-1">
              دو جایزه برای تیم های
              <br />
              چهارم تا بیستم
              <br />
              دوجایزه ویژه برای مینی گیم ها
            </span>
          </v-card-text>
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      trophies: [
        {
          place: 'تیم اول',
          price: '۱۲',
          icon: 'mdi-trophy',
          col: 6,
        },
        {
          place: 'تیم دوم',
          price: '۸',
          icon: 'mdi-trophy-outline',
          col: 5,
        },
        {
          place: 'تیم سوم',
          price: '۶',
          icon: 'mdi-trophy-variant-outline',
          col: 4,
        },
      ],
    };
  },
  props: {
    onIntersecTrophy: Function,
  },
};
</script>
