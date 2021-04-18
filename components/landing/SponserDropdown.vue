<template>
  <v-menu offset-y class="transparent">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark tile plain v-bind="attrs" v-on="on">
        <v-icon>mdi-menu-down</v-icon>
        <span>اسپانسر</span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item link :to="item.to" v-for="(item, index) in items" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: ' دیجی کالا', to: '/sponsors/digikala' },
      { title: 'آپارات (حامی رسانه‌ای) ', to: '/sponsors/aparat' },
    ],
  }),
  methods: {
    getClass() {
      return (this.color === 'primary' ? 'hover_primary ' : 'hover_white ') + 'transparent py-8 text-h5 text-sm-subtitle-2';
    },
  },
};
</script>

<style scoped lang="scss">
// .hover_white {
//   &.v-btn--active,
//   &:hover {
//     color: var(--v-anchor-base);
//     transition: all 0.7s;
//   }
// }
// .hover_primary {
//   &.v-btn--active,
//   &:hover {
//     transition: all 0.7s;
//   }
// }
</style>
