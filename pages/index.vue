<template>
  <div id="main">
    <Header color="transparent" />
    <HeadTop />
    <Social />
    <Intersection
      :isIntersecAbout="isIntersec.About"
      :isIntersecTimeline="isIntersec.Timeline"
      :isIntersecSponser="isIntersec.Sponser"
      :isIntersecVideo="isIntersec.Video"
      :isIntersecStaff="isIntersec.Staff"
      :isIntersecTrophy="isIntersec.Trophy"
    />
    <About :onIntersecAbout="onIntersecAbout" />
    <Video :onIntersecVideo="onIntersecVideo" />
    <Statistics />
    <TimeLine :onIntersecTimeline="onIntersecTimeline" />
    <TrophyDesktop :trophies="trophies" class="hidden-sm-and-down" :onIntersecTrophy="onIntersecTrophy" />
    <TrophyMobile :trophies="trophies" class="hidden-md-and-up" :onIntersecTrophy="onIntersecTrophy" />
    <Staff :onIntersecStaff="onIntersecStaff" />
    <Sponsor :onIntersecSponser="onIntersecSponser" />
    <!-- <EmaliCallToAction /> -->
    <CallToAction />
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Intersection from '~/components/landing/Intersection.vue';
import TimeLine from '~/components/landing/Timeline';
import Video from '~/components/landing/video.vue';
import Statistics from '~/components/landing/Statistics';
import TrophyDesktop from '~/components/landing/TrophyDesktop';
import TrophyMobile from '~/components/landing/TrophyMobile';
import Social from '~/components/landing/Social.vue';
import About from '~/components/landing/About.vue';
import Sponsor from '~/components/landing/Sponsor.vue';
import HeadTop from '~/components/landing/HeadTop.vue';
import CallToAction from '~/components/CallToAction.vue';
import Staff from '~/components/landing/staff/Staff';
import EmaliCallToAction from '~/components/EmailCallToAction.vue';

export default {
  components: {
    Header,
    Video,
    Statistics,
    Intersection,
    TimeLine,
    TrophyDesktop,
    TrophyMobile,
    Social,
    About,
    Sponsor,
    HeadTop,
    Staff,
    CallToAction,
    EmaliCallToAction,
  },
  layout: 'landing',
  EmaliCallToActionh: false,
  data: () => ({
    isIntersec: {
      About: false,
      Timeline: false,
      Sponser: false,
      Video: false,
      Staff: false,
      Trophy: false,
    },
    width: 0,
    height: 0,
    scrollItem: 0,
    trophies: [],
  }),
  async fetch() {
    const trophies = await this.$axios.$get('homepage/prizes');
    this.trophies = trophies.data;
  },

  methods: {
    onIntersecAbout(entries, observer) {
      this.isIntersec.About = entries[0].isIntersecting;
    },
    onIntersecTimeline(entries, observer) {
      this.isIntersec.Timeline = entries[0].isIntersecting;
    },
    onIntersecSponser(entries, observer) {
      this.isIntersec.Sponser = entries[0].isIntersecting;
    },
    onIntersecVideo(entries, observer) {
      this.isIntersec.Video = entries[0].isIntersecting;
    },
    onIntersecStaff(entries, observer) {
      this.isIntersec.Staff = entries[0].isIntersecting;
    },
    onIntersecTrophy(entries, observer) {
      this.isIntersec.Trophy = entries[0].isIntersecting;
    },
    scrollHandle() {
      window.addEventListener('scroll', this.scrollHandleFunc);
      window.addEventListener('resize', this.reSize);
    },
    reSize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    scrollHandleFunc() {
      if (this.width > 767) {
        if (document.querySelector('html').scrollTop > this.height / 2) {
          for (let item = 0; item < 6; item++) {
            document.getElementsByClassName('intersectionItem')[item].style.transform = ' translateX(-200px)';
          }
          document.getElementsByClassName('intersection')[0].style.left = '0px';
        } else {
          for (let item = 0; item < 6; item++) {
            document.getElementsByClassName('intersectionItem')[item].style.transform = ' translateX(0px)';
          }
          document.getElementsByClassName('intersection')[0].style.left = '30px';
        }
      } else if (this.width < 500) {
        switch (true) {
          case this.isIntersec.About: {
            this.scrollItem = 0;
            break;
          }
          case this.isIntersec.Video: {
            this.scrollItem = 50;
            break;
          }
          case this.isIntersec.Timeline: {
            this.scrollItem = 100;
            break;
          }
          case this.isIntersec.Trophy: {
            this.scrollItem = 150;
            break;
          }
          case this.isIntersec.Staff: {
            this.scrollItem = 200;
            break;
          }
          case this.isIntersec.Sponser: {
            this.scrollItem = 250;
            break;
          }
        }
        document.getElementById('intersection').scrollTo({
          left: -this.scrollItem,
          behavior: 'smooth',
        });
      }
    },
  },
  mounted() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    for (let item = 0; item < 6; item++) {
      document.getElementsByClassName('intersectionItem')[item].style.transform = ' translateX(0px)';
    }
    this.scrollHandle();
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollHandleFunc);
  },
};
</script>

<style>
body {
  overflow-x: hidden;
}
.v-dialog--fullscreen {
  background: #0e1224;
}
</style>
