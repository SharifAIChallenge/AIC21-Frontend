<template>
  <v-app>
    <v-app-bar flat clipped-right absolute height="80" color="transparent">
      <v-row class="justify-end">
        <!-- <account-menu :mobile="$vuetify.breakpoint.xsOnly" class="me-5" /> -->
      </v-row>
    </v-app-bar>
    <v-app-bar
      app
      flat
      clipped-right
      :min-width="mobile ? 220 : 256"
      :hide-on-scroll="mobile"
      style="left: unset;overflow:hidden"
      height="100"
    >
      <v-app-bar-nav-icon class="ms-1 hidden-lg-and-up" @click.stop="drawer = !drawer" />
      <v-row class="justify-center">
        <nuxt-link to="/" class="white--text">
          <img src="../assets/images/logo/logo__primary.svg" alt="" height="80px" class="nav_logo" />
        </nuxt-link>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" mobile-break-point="960" floating app right clipped class="" color="primary">
      <v-list>
        <template v-for="item in routes">
          <v-list-item
            :key="item.title"
            class="mt-6 pr-9"
            active-class="font-weight-bold"
            @click="activeLink = item.title"
            style="height:36px;font-weight-bold"
            :disabled="item.disabled"
            :to="item.link"
            exact
            nuxt
          >
            <span class="white" style="width:6px;height:100%;position: absolute;right:0" v-show="activeLink == item.title">I</span>
            <v-list-item-icon class="py-3 my-0">
              <v-icon v-if="activeLink != item.title">{{ item.icon }}</v-icon>
              <v-icon v-else>{{ item.hover }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="mr-6">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="item.divider" :key="`+${item.title}`" />
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main style="padding: 0px 256px 0px 0px;">
      <v-container class="dashboard px-md-0 pt-0 pb-12" fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Logo from '../components/Logo';

export default {
  components: { Logo },
  data() {
    return {
      drawer: null,
      activeLink: 'خانه',
      routes: {
        home: {
          title: 'خانه',
          icon: 'mdi-home-variant-outline',
          hover: 'mdi-home-variant',
          link: '/dashboard',
          disabled: false,
        },
        terms: {
          title: 'مستندات و منابع',
          icon: 'mdi-file-document-outline',
          hover: 'mdi-file-document',
          link: '/dashboard/terms',
          disabled: false,
        },
        updates: {
          title: 'محتوای آموزشی',
          icon: 'mdi-school-outline',
          hover: 'mdi-school',
          link: '/dashboard/updates',
          disabled: false,
        },
        tournaments: {
          title: 'تورنومنت ها',
          icon: 'mdi-tournament',
          hover: 'mdi-tournament',
          link: '/dashboard/tournaments',
          disabled: false,
        },
        scoreboard: {
          title: 'جدول امتیازات',
          icon: 'mdi-scoreboard-outline',
          hover: 'mdi-scoreboard',
          link: '/dashboard/scoreboard',
          disabled: false,
        },
        team: {
          title: 'تیم',
          icon: 'mdi-account-group-outline',
          hover: 'mdi-account-group',
          link: '/dashboard/team',
          disabled: false,
        },
        submissions: {
          title: 'ارسال کد',
          icon: 'mdi-code-braces',
          hover: 'mdi-code-braces-box',
          link: '/dashboard/submissions',
          disabled: false,
        },
        games: {
          title: 'بازی ها',
          icon: 'mdi-sword',
          hover: 'mdi-sword-cross',
          link: '/dashboard/games',
          disabled: false,
        },
      },
    };
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  // created() {
  //   return this.$store.dispatch('games/getChallenge');
  // },
};
</script>

<style scoped>
.nav_logo:hover {
  height: 200px;
}
</style>
