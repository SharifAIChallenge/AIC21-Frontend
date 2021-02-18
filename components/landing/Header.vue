<template>
  <div>
    <div v-if="show">
      <formManager />
    </div>
    <v-navigation-drawer :color="color" absolute right v-model="showMenu" height="100%" width="100%">
      <v-btn icon @click="showMenu = !showMenu" class="transparent ma-3">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
      <v-row class="justify-center">
        <v-list>
          <v-list-item @click="toggleShow()">ورود</v-list-item>
          <v-list-item>اخبار</v-list-item>
          <v-list-item>تاریخچه</v-list-item>
          <v-list-item>سوالات متداول</v-list-item>
        </v-list>
      </v-row>
    </v-navigation-drawer>
    <v-app-bar flat :color="color">
      <v-btn icon class="transparent hidden-sm-and-up" @click="showMenu = !showMenu">
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
      <div class="hidden-xs-only">
        <v-btn plain text tile class="transparent mx-4 " @click="toggleShow">
          <v-icon left>
            mdi-shield-star
          </v-icon>
          <span>ورود</span>
        </v-btn>
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
      <logoWhite v-if="color === 'primary'" />
      <logoPrimary v-else />
    </v-app-bar>
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
    changeStatus(form) {
      this.$store.commit('formStatus/changeStatus', form);
    },
  },
};
</script>
