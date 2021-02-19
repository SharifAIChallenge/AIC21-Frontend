<template>
  <div id="main">
    <Header color="transparent" />
    <Statistics />
    <Intersection />
    <TrophyDesktop />
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Statistics from '~/components/landing/Statistics';
import Intersection from '~/components/landing/Intersection.vue'
import TrophyDesktop from '~/components/landing/TrophyDesktop';
export default {
  components: { Header ,Statistics,Intersection,TrophyDesktop },
  layout: 'landing',
  auth: false,
};
</script>

<style></style>
