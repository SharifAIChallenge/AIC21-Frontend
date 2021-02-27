<template>
  <v-footer dark padless class="footer">
    <v-card-text class="align-center justify-space-between d-flex mx-md-3 flex-wrap">
      <v-row dir="ltr" align="center">
        <v-col class="d-flex col-12 col-md-3 justify-center justify-md-start">
          <img src="../assets/images/logo/logo__primary.svg" class="logo" />
        </v-col>
        <v-col class="hidden-sm-and-down col-12 col-md-6 social_box mx-auto mb-3 ">
          <div class="d-flex justify-center ">
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
          </div>
        </v-col>

        <v-col class="primary--text col-12 col-md-3  text-center text-md-right">
          <v-icon right small class="primary--text">mdi-copyright</v-icon>
          2021 Sharif AI Challenge
        </v-col>
      </v-row>
    </v-card-text>
  </v-footer>
</template>

<script>
import LogoMark from '../components/LogoMark';

export default {
  components: { LogoMark },
  data() {
    return {
      socials: [],
    };
  },
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
