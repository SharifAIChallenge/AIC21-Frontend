<template>
  <div id="doc-header">
    <v-app-bar flat absolute :color="color">
      <!-- <v-btn icon class="transparent hidden-sm-and-up" @click="showMenu = !showMenu">
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn> -->
      <div id="menu">
        <v-btn plain text :ripple="false" tile :class="getClass()" to="/">خانه</v-btn>
        <v-btn plain text :ripple="false" tile :class="getClass()" to="/dashboard">داشبورد</v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <!-- <img src="../../assets/images/logo/logo__primary.svg" class="logo" /> -->
    </v-app-bar>
  </div>
</template>
<script>
export default {
  props: ['color'],
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    getClass() {
      return (this.color === 'primary' ? 'hover_primary ' : 'hover_white ') + 'transparent py-8 text-h5 text-sm-subtitle-2';
    },
  },
};
</script>
<style lang="scss">
@import '~/assets/mixins.scss';
#doc-header {
  position: fixed;
  width: 100%;
  top: 0;
  @include v-not-md {
    top: 90px;
  }
}
</style>
