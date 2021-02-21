<template>
  <v-card tile flat class="secondary my-5" style="padding: 10vh 0">
    <v-container>
      <v-row>
        <v-col cols="6" md="3" v-for="(stat, i) in stats" :key="i">
          <v-card-text class="px-10 py-0 text-right mx-auto">
            <v-icon size="60px" right class="mb-7 black--text">{{ stat.icon }}</v-icon>
            <h1 class="text-h3 mb-7">{{ stat.part }}</h1>
            <span class="pt-1 text-h5" style="border-top:1px solid white">{{ stat.info }}</span>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      stats: [
        {
          icon: 'mdi-clipboard-account',
          part: NaN,
          info: 'شرکت کننده',
        },
        {
          icon: 'mdi-account-group',
          part: NaN,
          info: 'تیم',
        },
        {
          icon: 'mdi-code-braces-box',
          part: NaN,
          info: 'ارسال کد',
        },
        {
          icon: 'mdi-sword-cross',
          part: NaN,
          info: 'نبرد',
        },
      ],
    };
  },
};
</script>
