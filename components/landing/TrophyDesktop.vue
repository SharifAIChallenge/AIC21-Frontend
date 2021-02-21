<template>
  <v-card tile flat class="transparent my-15">
    <v-row justify="end" align="center" class="mx-5">
    <v-col cols="3">
      <div class="px-3 white--text text-h2 font-weight-bold" style="padding-bottom:22rem">
        جوایز
      </div>
    </v-col>
      <v-col cols="3" v-for="(trophy, i) in trophies" :key="i" :style="`margin-top:${trophy.marg}rem`">
        <v-card-text class="d-flex flex-column px-10 text-center white--text">
          <span class="text-h2 font-weight-black">{{ trophy.price }}</span>
          <span class="pt-1" style="border-top:1px solid white">میلیون تومان</span>
        </v-card-text>
        <v-card-text class="secondary text-center darken-2 font-weight-black">
          <span class="font-weight-black text-body-1">{{ trophy.place }}</span>
        </v-card-text>
        <v-card-text class="secondary text-center pb-0 pt-15">
          <v-icon size="7rem" class="black--text">{{ trophy.icon }}</v-icon>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row justify="start" align="center" class="mx-10 mt-0">
      <v-col cols="3" class="pl-0 pr-15">
        <v-card-text class="justify-center primary text-center">
          <v-icon size="7rem" class="black--text" width="100%">mdi-plus</v-icon>
        </v-card-text>
      </v-col>
      <v-col cols="9" class="pr-0">
        <v-card-text>
          <span class="white--text font-weight-black text-body-1">دو جایزه برای تیم های چهارم تا بیستم<br/> دوجایزه ویژه برای مینی گیم ها</span>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
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
          marg:14
        },
        {
          place: 'تیم اول',
          price: '۱۲',
          icon: 'mdi-trophy',
          marg:0
        },
        {
          place: 'تیم دوم',
          price: '۸',
          icon: 'mdi-trophy-outline',
          marg:7
        },
      ],
    };
  },
};
</script>
