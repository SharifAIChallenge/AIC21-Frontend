<template>
  <div id="main">
    <Header color="transparent" />
    <Statistics />
    <Intersection />
    <TrophyDesktop class="hidden-sm-and-down"/>
    <TrophyMobile class="hidden-md-and-up"/>
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Statistics from '~/components/landing/Statistics';
import Intersection from '~/components/landing/Intersection.vue'
import TrophyDesktop from '~/components/landing/TrophyDesktop';
import TrophyMobile from '~/components/landing/TrophyMobile';
export default {
  components: { Header ,Statistics,Intersection,TrophyDesktop,TrophyMobile},
  layout: 'landing',
  auth: false,
};
</script>

<style></style>
