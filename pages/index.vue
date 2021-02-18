<template>
  <div id="main">
    <Header color="transparent" />
    <Intersection />
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Intersection from '~/components/landing/Intersection.vue'
export default {
  components: { Header ,Intersection },
  layout: 'landing',
  auth: false,
};
</script>

<style></style>
