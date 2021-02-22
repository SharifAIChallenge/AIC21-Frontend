<template>
  <div id="main">
    <!-- <Header color="transparent" /> -->
    <HeadTop />
    <!-- <Social /> -->
    <Intersection />
    <!-- <About /> -->
    <Video />
    <Statistics />
    <TrophyDesktop class="hidden-sm-and-down" />
    <TrophyMobile class="hidden-md-and-up" />
    <Sponsor />
    <Staff />
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Intersection from '~/components/landing/Intersection.vue';
import Video from '~/components/landing/video.vue';
import Statistics from '~/components/landing/Statistics';
import TrophyDesktop from '~/components/landing/TrophyDesktop';
import TrophyMobile from '~/components/landing/TrophyMobile';
import Social from '~/components/landing/Social.vue';
import About from '~/components/landing/About.vue';
import Sponsor from '~/components/landing/Sponsor.vue';
import HeadTop from '~/components/landing/HeadTop.vue';
import Staff from '~/components/landing/staff/Staff';

export default {
  components: { Header, Video, Statistics, Intersection, TrophyDesktop, TrophyMobile, Social, About, Sponsor, HeadTop, Staff },
  layout: 'landing',
  auth: false,
  methods: {
    scrollHandle() {
      window.addEventListener('scroll', scrollHandleFunc);
      let height = window.innerHeight;
      function scrollHandleFunc() {
        if (document.querySelector('html').scrollTop > height) {
          document.getElementsByClassName('intersectionItem')[0].style.opacity = 0;
          document.getElementsByClassName('intersectionItem')[1].style.opacity = 0;
        } else {
          document.getElementsByClassName('intersectionItem')[0].style.opacity = 1;
          document.getElementsByClassName('intersectionItem')[1].style.opacity = 1;
        }
      }
    },
  },
  beforeMount() {
    document.getElementsByClassName('intersectionItem')[0].style.opacity = 1;
    document.getElementsByClassName('intersectionItem')[1].style.opacity = 1;
    this.scrollHandle();
  },
};
</script>

<style></style>
