<template>
  <v-footer dark padless class="footer">
    <v-card-text class="align-center justify-space-between d-flex mx-md-3 flex-wrap">
      <v-row>
        <v-col cols="12" md="2" dir="ltr" class="primary--text d-flex align-center justify-center justify-md-start">
          <strong>
            <v-icon right small class="primary--text">mdi-copyright</v-icon>
            2021 Sharif AI Challenge
          </strong>
        </v-col>
        <v-col cols="0" md="8" class="hidden-md-and-down mx-auto mb-3 d-flex justify-center align-center">
          <v-btn
            v-for="social in socials"
            :key="social.icon"
            :href="social.url"
            class="mx-4 transparent primary--text mx-sm-4"
            target="_blank"
            icon
            large
          >
            <v-icon size="30px">
              {{ social.icon }}
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="2" dir="ltr" class="d-flex justify-center justify-md-start">
          <img src="../assets/images/logo/logo__primary.svg" class="logo" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-footer>
</template>

<script>
import LogoMark from '../components/LogoMark';

export default {
  components: { LogoMark },
  async fetch() {
    let data = await this.$axios.$get('homepage/socials');
    this.socials = data.socials;
  },
};
</script>

<style scoped lang="scss">
@import 'assets/mixins.scss';
.footer {
  padding: 40px 0px;
  .logo {
    width: 60px;
  }
}
</style>
