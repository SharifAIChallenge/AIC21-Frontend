<template>
  <div id="main">
    <Header color="transparent" />
    <Statistics />
    <Intersection />
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Statistics from '~/components/landing/Statistics';
import Intersection from '~/components/landing/Intersection.vue'
export default {
  components: { Header ,Statistics,Intersection },
  layout: 'landing',
  auth: false,
};
</script>

<style></style>
