<template>
  <div id="main">
    <Header color="transparent" />
<<<<<<< HEAD
    <Video color="red" />
=======
    <Intersection />
>>>>>>> 88b1cdebc202bf76f5361e24f7030bfe13624f7c
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
<<<<<<< HEAD
import Video from '~/components/landing/video.vue'
export default {
  components: { Header , Video},
=======
import Intersection from '~/components/landing/Intersection.vue'
export default {
  components: { Header ,Intersection },
>>>>>>> 88b1cdebc202bf76f5361e24f7030bfe13624f7c
  layout: 'landing',
  auth: false,
};
</script>

<style></style>
