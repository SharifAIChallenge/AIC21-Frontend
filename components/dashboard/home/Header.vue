<template>
  <v-app>
    <v-navigation-drawer absolute right v-model="showMenu" height="100%" width="100%">
        <v-btn icon @click="showMenu = !showMenu" class="transparent ma-3">
            <v-icon>
                mdi-close
            </v-icon>
        </v-btn>
    </v-navigation-drawer>
    <v-app-bar flat color="transparent">
      <v-btn icon class="transparent hidden-sm-and-up" @click="showMenu = !showMenu">
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
      <div class="hidden-xs-only">
        <v-btn plain text tile class="transparent mx-4 ">ورود</v-btn>
        <v-btn plain text tile class="transparent mx-4">اخبار</v-btn>
        <v-btn plain text tile class="transparent mx-4">تاریخچه</v-btn>
        <v-btn plain text tile class="transparent mx-4">سوالات متداول</v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn plain text tile class="transparent mx-4 hidden-sm-and-up">
        <v-icon left>
          mdi-shield-star
        </v-icon>
        <span>ورود</span>
      </v-btn>
      <v-spacer></v-spacer>
      <logo />
    </v-app-bar>
  </v-app>
</template>
<script>
import LogoMark from '~/components/LogoMark';
export default {
  data() {
    return {
      showMenu: true,
    };
  },
  components: {
    logo: LogoMark,
  },
};
</script>
