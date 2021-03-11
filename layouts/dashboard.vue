<template>
  <v-app>
    <v-app-bar app flat clipped-right :hide-on-scroll="mobile" style="left: unset;overflow:hidden;" height="90" class="dashbordNav">
      <v-app-bar-nav-icon class="ms-1 hidden-md-and-up pa-0" @click.stop="drawer = !drawer" />
      <v-row class="justify-center logo">
        <nuxt-link to="/" class="white--text">
          <img src="../assets/images/logo/logo__primary.svg" alt="" height="80px" class="nav_logo mt-2" />
        </nuxt-link>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :permanent="$vuetify.breakpoint.mdAndUp" floating app right clipped class="" color="primary">
      <v-list class="py-0">
        <template v-for="item in routes">
          <v-list-item
            :key="item.title"
            class="mt-6 pr-9"
            active-class="font-weight-bold"
            @click="activeLink = item.title"
            style="min-height:36px;height:36px;font-weight-bold"
            :disabled="item.disabled"
            :to="item.link"
            exact
            nuxt
          >
            <span class="white" style="width:6px;height:100%;position: absolute;right:0" v-show="activeLink == item.title">I</span>
            <v-list-item-icon class="py-1 my-0">
              <v-icon v-if="activeLink != item.title">{{ item.icon }}</v-icon>
              <v-icon v-else>{{ item.hover }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="mr-6">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="item.divider" :key="`+${item.title}`" />
        </template>
        <div class="d-flex justify-center mt-auto">
          <v-list class="pa-2 d-flex">
            <v-list-item :to="bottomRoute.settings.link" class="ma-2">
              <v-icon>{{ bottomRoute.settings.icon }}</v-icon>
            </v-list-item>
            <v-list-item @click="logout" style="cursor: pointer" class="ma-2 ">
              <v-icon>{{ bottomRoute.logout.icon }}</v-icon>
            </v-list-item>
          </v-list>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-main style="padding: 0px;">
      <v-container class="dashboard px-0 pt-0 pb-12 pb-md-0" fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Logo from '../components/Logo';
import { mapState } from 'vuex';

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
      bottomRoute: {
        settings: {
          icon: 'mdi-cog-outline',
          link: '/dashboard/settings',
        },
        logout: {
          icon: 'mdi-logout-variant',
          link: '/',
        },
      },
    };
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    ...mapState({
      auth: state => state.auth,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },
  beforeMount() {
    console.log(this.auth.token, this.auth.isAuthenticated);
    this.$axios.setToken(this.auth.token, 'token');
    this.$store.dispatch('auth/getUser');
    console.log(this.auth.user);
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/mixins.scss';

.v-navigation-drawer {
  width: 265px !important;
}
.dashbordNav {
  width: 265px;
  @include v-not-md {
    width: 100%;
    position: relative;
    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-30%) scale(4);
    }
  }
}
.dashboard {
  padding-top: 90px !important;
  @include v-md {
    padding-right: 265px !important;
    padding-top: 0 !important;
  }
}
.nav_logo {
  transition: 0.4s;
}
.nav_logo:hover {
  height: 200px;
}
</style>
