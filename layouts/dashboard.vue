<template>
  <v-app>
    <v-app-bar flat clipped-right absolute height="80" color="transparent">
      <v-row class="justify-end">
        <account-menu :mobile="$vuetify.breakpoint.xsOnly" class="me-5" />
      </v-row>
    </v-app-bar>
    <v-app-bar app flat clipped-right collapse :min-width="mobile ? 220 : 256" :hide-on-scroll="mobile" style="left: unset" height="80">
      <v-app-bar-nav-icon class="ms-1 hidden-md-and-up" @click.stop="drawer = !drawer" />
      <v-row class="justify-center">
        <nuxt-link to="/" class="white--text">
          <logo />
          <!--        <logo-mark />-->
        </nuxt-link>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="960"
      floating
      app
      right
      clipped
      bottom
      class="dashboard-nav mt-6"
      color="primary"
    >
      <v-list shaped>
        <template v-for="(item) in routes">
          <v-list-item :key="item.title" active-class="font-weight-bold" :disabled="item.disabled" :to="item.link" exact nuxt>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="item.divider" :key="`+${item.title}`" />
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="dashboard px-md-6 pb-12" fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Logo from '../components/Logo';
import AccountMenu from '../components/AccountMenu';

export default {
  components: { AccountMenu, Logo },
  data() {
    return {
      drawer: null,
      routes: {
        home: {
          title: 'dashboard.home',
          icon: 'mdi-home-variant-outline',
          link: '/dashboard',
          disabled: false,
        },
        terms: {
          title: 'dashboard.termsAndConditions',
          icon: 'mdi-alert-circle-outline',
          link: '/dashboard/terms',
          disabled: false,
        },
        updates: {
          title: 'dashboard.updates',
          icon: 'mdi-bell-outline',
          link: '/dashboard/updates',
          disabled: false,
          divider: true,
        },
        // getting_started: {
        //   title: "dashboard.gettingStarted",
        //   icon: "mdi-help-circle-outline",
        //   link: "/dashboard/getting_started",
        //   disabled: true
        // },
        resources: {
          title: 'dashboard.resources',
          icon: 'mdi-file-document-outline',
          link: '/dashboard/resources',
          disabled: false,
        },
        tutorials: {
          title: 'dashboard.tutorials',
          icon: 'mdi-school-outline',
          link: '/dashboard/tutorials',
          disabled: false,
          divider: true,
        },
        tournaments: {
          title: 'dashboard.tournaments',
          icon: 'mdi-tournament',
          link: '/dashboard/tournaments',
          disabled: false,
        },
        scoreboard: {
          title: 'dashboard.scoreboard',
          icon: 'mdi-scoreboard-outline',
          link: '/dashboard/scoreboard',
          disabled: false,
          divider: true,
        },
        team: {
          title: 'dashboard.team',
          icon: 'mdi-account-group',
          link: '/dashboard/team',
          disabled: false,
        },
        submissions: {
          title: 'dashboard.submissions',
          icon: 'mdi-upload-outline',
          link: '/dashboard/submissions',
          disabled: false,
        },
        games: {
          title: 'dashboard.games',
          icon: 'mdi-gamepad-variant-outline',
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
  created() {
    return this.$store.dispatch('games/getChallenge');
  },
};
</script>

<style scoped>
.dashboard-nav {
  border-top-left-radius: 24px;
}
</style>
