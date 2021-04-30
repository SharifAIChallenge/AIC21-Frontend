<template>
  <v-app class="dashboardMenu">
    <v-app-bar app clipped-right :hide-on-scroll="mobile" style="left: unset; overflow: hidden" height="90" class="dashbordNav">
      <v-app-bar-nav-icon class="ms-1 hidden-md-and-up pa-0" @click.stop="drawer = !drawer" />
      <v-row class="justify-center logo">
        <nuxt-link to="/" class="white--text" style="width: 100%; height: 100%">
          <img src="../assets/images/logo/logo__primary.svg" alt="" height="80px" class="nav_logo mt-2" />
        </nuxt-link>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :permanent="$vuetify.breakpoint.mdAndUp" floating app right clipped class="pt-6" color="primary">
      <v-list class="py-0">
        <template v-for="item in routes">
          <v-list-item
            :key="item.title"
            class="py-md-4 py-lg-5 py-xl-6 pr-9"
            active-class="font-weight-bold"
            @click="activeLink = item.title"
            style="min-height:36px;height:36px;font-weight-bold"
            :disabled="item.disabled || !profile || (item.gard && !profile.is_complete)"
            :to="item.link"
            exact
            nuxt
          >
            <span class="white" style="width: 6px; height: 100%; position: absolute; right: 0" v-show="activeLink == item.title">I</span>
            <v-list-item-icon class="py-1 my-0" style="transform: translateY(-17px)">
              <v-icon v-if="activeLink != item.title">{{ item.icon }}</v-icon>
              <v-icon v-else>{{ item.hover }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="mr-6">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="item.divider" :key="`+${item.title}`" />
        </template>
        <div class="d-flex justify-center mt-auto" style="position: absolute; left: 0; width: 100%; bottom: 0">
          <v-list class="pa-2 d-flex">
            <v-list-item :to="bottomRoute.settings.link" class="ma-2" @click="activeLink = bottomRoute.settings.title">
              <v-icon v-if="activeLink != bottomRoute.settings.title">{{ bottomRoute.settings.icon }}</v-icon>
              <v-icon v-else>{{ bottomRoute.settings.hover }}</v-icon>
            </v-list-item>
            <v-list-item @click="logout" style="cursor: pointer" class="ma-2">
              <v-icon>{{ bottomRoute.logout.icon }}</v-icon>
            </v-list-item>
          </v-list>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-main style="padding: 0px">
      <v-container class="dashboard pl-0 pt-md-0 pb-0" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <PaymentDialog :dialog="payDialog" @close="payDialog = false" />
  </v-app>
</template>

<script>
import PaymentDialog from '~/components/dashboard/PaymentDialog';
import { mapState } from 'vuex';

export default {
  components: { PaymentDialog },
  data() {
    return {
      drawer: null,
      activeLink: 'خانه',
      payDialog: false,
      routes: {
        home: {
          title: 'خانه',
          icon: 'mdi-home-variant-outline',
          hover: 'mdi-home-variant',
          link: '/dashboard',
          disabled: false,
          gard: false,
        },
        terms: {
          title: 'مستندات',
          icon: 'mdi-file-document-outline',
          hover: 'mdi-file-document',
          link: '/dashboard/doc/Game-Doc',
          disabled: false,
          gard: true,
        },
        doc: {
          title: 'منابع',
          icon: 'mdi-source-fork',
          hover: 'mdi-source-repository',
          link: '/dashboard/terms',
          disabled: false,
          gard: true,
        },
        tournaments: {
          title: 'تورنومنت ها',
          icon: 'mdi-tournament',
          hover: 'mdi-tournament',
          link: '/dashboard/tournaments',
          disabled: false,
          gard: true,
        },
        scoreboard: {
          title: 'جدول امتیازات',
          icon: 'mdi-scoreboard-outline',
          hover: 'mdi-scoreboard',
          link: '/dashboard/scoreboard',
          disabled: false,
          gard: true,
        },
        team: {
          title: 'تیم',
          icon: 'mdi-account-group-outline',
          hover: 'mdi-account-group',
          link: '/dashboard/team',
          disabled: true,
          gard: true,
        },
        ticket: {
          title: 'تیکت',
          icon: 'mdi-filmstrip-box-multiple',
          hover: 'mdi-filmstrip-box-multiple',
          link: '/dashboard/ticket',
          disabled: false,
          gard: true,
        },
        submissions: {
          title: 'ارسال کد',
          icon: 'mdi-code-braces',
          hover: 'mdi-code-braces-box',
          link: '/dashboard/submissions',
          disabled: false,
          gard: true,
        },
        games: {
          title: 'بازی ها',
          icon: 'mdi-sword',
          hover: 'mdi-sword-cross',
          link: '/dashboard/games',
          disabled: false,
          gard: true,
        },
        final: {
          title: 'فینال',
          icon: 'mdi-trophy-award',
          hover: 'mdi-trophy-award',
          link: '/final',
          disabled: false,
          gard: false,
        },
        live: {
          title: 'لایو',
          icon: 'mdi-presentation-play',
          hover: 'mdi-presentation-play',
          link: '/live',
          disabled: false,
          gard: false,
        },
      },
      bottomRoute: {
        settings: {
          title: 'تنظیمات',
          icon: 'mdi-cog-outline',
          hover: 'mdi-cog',
          link: '/dashboard/settings',
          disabled: false,
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
      token: state => state.auth.token,
      profile: state => state.auth.user,
    }),
  },
  watch: {
    profile(now, old) {
      if (now) {
        // this.routes.team.disabled = !this.profile.is_complete;
        if (!this.profile.is_complete && this.$route.path !== '/dashboard/settings') {
          this.$router.push('/dashboard/settings');
          this.$toast.error('لطفا ابتدا اطلاعات شخصی را کامل کنید');
        }
        if (this.profile.has_team) {
          this.openDialog();
        } else {
          this.routes.games.disabled = true;
          // this.routes.tournaments.disabled = true;
          this.routes.submissions.disabled = true;
        }
        if (this.profile.is_finalist) {
          this.routes.team.disabled = false;
          this.routes.games.disabled = false;
        }
        if (this.$route.path === '/dashboard/team' && !this.profile.is_finalist) {
          this.$router.push('/dashboard');
        }
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
    openDialog() {
      if (!localStorage.getItem('isSawDialog')) {
        this.payDialog = true;
      }
    },
  },
  beforeMount() {
    this.$axios.setToken(this.token, 'token');
    this.$store.dispatch('auth/getUser');
  },
};
</script>

<style lang="scss">
@import '~/assets/mixins.scss';
#__nuxt {
  overflow: hidden;
}

.dashboardMenu {
  .v-navigation-drawer {
    width: 265px !important;
  }
}
.v-list-item--link::before {
  background-color: transparent !important;
}
.dashbordNav {
  width: 265px;
  background: #141432 !important;
  &:hover .nav_logo {
    transform: scale(1);
  }
  @include v-not-md {
    width: 100%;
    position: relative;
    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-40%) scale(4);
    }
  }
}
.dashboard {
  padding-top: 90px !important;
  padding-right: 0;
  @include v-md {
    padding-right: 265px !important;
  }
}
.nav_logo {
  transform: scale(3.3) translateY(-1px);
  width: 100%;
  transition: 0.4s;
}
.v-app-bar__nav-icon {
  position: relative;
  z-index: 2000;
}
</style>
