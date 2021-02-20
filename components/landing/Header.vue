<template>
  <div>
    <v-navigation-drawer :color="color" absolute right v-model="showMenu" height="100%" width="100%">
      <v-btn icon @click="showMenu = !showMenu" class="transparent ma-3">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
      <v-row class="justify-center">
        <v-list>
          <v-list-item to="/blog">اخبار</v-list-item>
          <v-list-item>تاریخچه</v-list-item>
          <v-list-item to="/faq">سوالات متداول</v-list-item>
        </v-list>
      </v-row>
    </v-navigation-drawer>
    <v-app-bar flat app fixed :color="color">
      <v-btn icon class="transparent hidden-sm-and-up" @click="showMenu = !showMenu">
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
      <div class="hidden-xs-only">
        <v-btn plain text tile class="transparent mx-4 " @click="toggleShow()">
          <v-icon left>
            mdi-shield-star
          </v-icon>
          <span>ورود</span>
        </v-btn>
        <v-btn plain text tile class="transparent mx-4" to="/blog">اخبار</v-btn>
        <v-btn plain text tile class="transparent mx-4">تاریخچه</v-btn>
        <v-btn plain text tile class="transparent mx-4" to="/faq">سوالات متداول</v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn plain text tile class="transparent mx-4 hidden-sm-and-up" @click="toggleShow()">
        <v-icon left>
          mdi-shield-star
        </v-icon>
        <span>ورود</span>
      </v-btn>
      <v-spacer></v-spacer>
      <logoWhite v-if="color === 'primary'" />
      <logoPrimary v-else />
    </v-app-bar>
    <formManager :isPage="false" />
  </div>
</template>
<script>
import LogoMark from '~/components/LogoMark';
import Logo from '~/components/Logo';
import formManager from '~/components/userForms/formManager';
import { mapState } from 'vuex';

export default {
  props: ['color'],
  data() {
    return {
      showMenu: false,
    };
  },
  components: {
    logoPrimary: LogoMark,
    logoWhite: Logo,
    formManager,
  },
  computed: {
    ...mapState({
      show: state => state.formStatus.show,
    }),
  },
  methods: {
    toggleShow() {
      this.$store.commit('formStatus/toggleShow');
    },
  },
};
</script>
<style scoped>
.navLinks {
  height: calc(100% - 200px);
}
</style>
