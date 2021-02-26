<template>
  <div id="main">
    <Header color="transparent" />
    <HeadTop />
    <Social />
    <Intersection
      :isIntersecAbout="isIntersecAbout"
      :isIntersecTimeline="isIntersecTimeline"
      :isIntersecSponser="isIntersecSponser"
      :isIntersecVideo="isIntersecVideo"
      :isIntersecStaff="isIntersecStaff"
      :isIntersecTrophy="isIntersecTrophy"
    />
    <About :onIntersecAbout="onIntersecAbout" />
    <Video :onIntersecVideo="onIntersecVideo" />
    <!-- <Statistics /> -->
    <TimeLine :onIntersecTimeline="onIntersecTimeline" />
    <TrophyDesktop class="hidden-sm-and-down" :onIntersecTrophy="onIntersecTrophy" />
    <TrophyMobile class="hidden-md-and-up" :onIntersecTrophy="onIntersecTrophy" />
    <Staff :onIntersecStaff="onIntersecStaff" />
    <Sponsor :onIntersecSponser="onIntersecSponser" />
    <EmaliCallToAction />
    <!-- <CallToAction /> -->
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
  auth: false,
  EmaliCallToActionh: false,
  data: () => ({
    isIntersecAbout: false,
    isIntersecTimeline: false,
    isIntersecSponser: false,
    isIntersecVideo: false,
    isIntersecStaff: false,
    isIntersecTrophy: false,
  }),
  methods: {
    onIntersecAbout(entries, observer) {
      this.isIntersecAbout = entries[0].isIntersecting;
    },
    onIntersecTimeline(entries, observer) {
      this.isIntersecTimeline = entries[0].isIntersecting;
    },
    onIntersecSponser(entries, observer) {
      this.isIntersecSponser = entries[0].isIntersecting;
    },
    onIntersecVideo(entries, observer) {
      this.isIntersecVideo = entries[0].isIntersecting;
    },
    onIntersecStaff(entries, observer) {
      this.isIntersecStaff = entries[0].isIntersecting;
    },
    onIntersecTrophy(entries, observer) {
      this.isIntersecTrophy = entries[0].isIntersecting;
    },
    scrollHandle() {
      window.addEventListener('scroll', this.scrollHandleFunc);
    },
    scrollHandleFunc() {
      let height = window.innerHeight;
      if (document.querySelector('html').scrollTop > height / 2) {
        for (let item = 0; item < 6; item++) {
          document.getElementsByClassName('intersectionItem')[item].style.transform = ' translateX(-100px)';
        }
        document.getElementsByClassName('intersection')[0].style.left = '0px';
      } else {
        for (let item = 0; item < 6; item++) {
          document.getElementsByClassName('intersectionItem')[item].style.transform = ' translateX(0px)';
        }
        document.getElementsByClassName('intersection')[0].style.left = '30px';
      }
    },
  },
  mounted() {
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
</style>
