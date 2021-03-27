<template>
  <v-app>
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
            class="py-6 pr-9 my-1"
            active-class="font-weight-bold"
            @click="activeLink = item.title"
            style="min-height:36px;height:36px;font-weight-bold"
            :disabled="item.disabled"
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
      </v-list>
    </v-navigation-drawer>
    <v-main style="padding: 0px">
      <v-container class="dashboard pl-0 pt-md-0 pb-12 pb-md-0" fluid>
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
          title: 'تیکت',
          icon: 'mdi-home-variant-outline',
          hover: 'mdi-home-variant',
          link: '/dashboard/admin/ticket',
          disabled: false,
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
      //   if (now) {
      //     this.routes.team.disabled = !this.profile.is_complete;
      //     if (!this.profile.is_complete && this.$route.path !== '/dashboard/settings') {
      //       this.$router.push('/dashboard/settings');
      //       this.$toast.error('لطفا ابتدا اطلاعات شخصی را کامل کنید');
      //     }
      //   }
    },
  },
  methods: {},
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

.v-navigation-drawer {
  width: 265px !important;
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
      transform: translateX(-30%) scale(4);
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
