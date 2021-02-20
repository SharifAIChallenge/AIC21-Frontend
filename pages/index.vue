<template>
  <div id="main">
    <Header color="transparent" />
    <Video />
    <Social />
    <Statistics />
    <!-- <Intersection /> -->
    <TrophyDesktop class="hidden-sm-and-down" />
    <TrophyMobile class="hidden-md-and-up" />
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

export default {
  components: { Header, Video, Statistics, Intersection, TrophyDesktop, TrophyMobile, Social },
  layout: 'landing',
  auth: false,
};
</script>

<style></style>
