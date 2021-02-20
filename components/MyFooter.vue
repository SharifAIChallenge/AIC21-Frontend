<template>
  <v-footer dark padless>
    <v-card-text class="align-center justify-space-between d-flex mx-sm-3 flex-wrap flex-md-column">
      <div class="social_box order-sm-1 order-0 mx-auto mb-3 justify-center">
        <!-- <v-row justify="center" align="center"> -->
          <!-- <v-col cols="4" sm="2"></v-col> -->
        <!-- </v-row> -->
      <v-btn
        v-for="social in socials"
        :key="social.icon"
        :href="social.url"
        class="mx-4 transparent primary--text mx-sm-2"
        target="_blank"
        icon
        large
      >
        <v-icon size="24px">
          {{ social.icon }}
        </v-icon>
      </v-btn>
      </div>
    <!-- </v-card-text> -->

    <!-- <v-card-text class="align-center justify-space-between d-flex mx-sm-3"> -->
      <div dir="ltr" class="primary--text order-sm-0 order-1">
        <strong>
          <v-icon right small class="primary--text">mdi-copyright</v-icon>
          2021 Sharif AI Challenge
        </strong>
      </div>
      <logo-mark class="order-2"/>
    </v-card-text>
  </v-footer>
</template>

<script>
import LogoMark from '../components/LogoMark';

export default {
  components: { LogoMark },
  data() {
    return {
      socials: [
        {
          icon: 'mdi-twitch',
          url: '/',
        },
        {
          icon: 'mdi-linkedin',
          url: '/',
        },
        {
          icon: 'mdi-instagram',
          url: 'http://www.instagram.com/AiChallenge',
        },
        {
          icon: 'mdi-github',
          url: '/',
        },
        {
          icon: 'mdi-twitter',
          url: 'http://www.twitter.com/AiChallenge',
        },
        {
          icon: 'mdi-telegram',
          url: 'https://t.me/aichallenge',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
 @import 'assets/mixins.scss';
 .social_box{
   @include not-md{
     width: 100vw;
   }
 }
</style>
