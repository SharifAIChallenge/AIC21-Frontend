<template>
  <v-footer dark padless>
    <v-card-text class="justify-center d-flex">
      <v-btn
        v-for="social in socials"
        :key="social.icon"
        :href="social.url"
        class="mx-4 transparent primary--text"
        target="_blank"
        icon
        large
      >
        <v-icon size="24px">
          {{ social.icon }}
        </v-icon>
      </v-btn>
    </v-card-text>

    <v-card-text class="white--text align-center justify-space-between d-flex mx-sm-3">
      <div dir="ltr" class="primary--text">
        <strong>
          <v-icon right small class="primary--text">mdi-copyright</v-icon>
          2021 Sharif AI Challenge
        </strong>
      </div>
      <logo-mark />
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

<style scoped></style>
