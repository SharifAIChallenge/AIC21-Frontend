<template>
  <div id="main">
    <HeadTop/>
    <Intersection />
  </div>
</template>

<script>
import HeadTop from '~/components/landing/HeadTop.vue';
import Intersection from '~/components/landing/Intersection.vue'
export default {
  components: { HeadTop ,Intersection },
  layout: 'landing',
  auth: false,
};
</script>

<style></style>
