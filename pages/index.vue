<template>
  <div id="main">
    <Header color="transparent" />
    <Video />
    <Intersection />
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Intersection from '~/components/landing/Intersection.vue';
import Video from '~/components/landing/video.vue';

export default {
  components: { Header, Video, Intersection },
  layout: 'landing',
  auth: false,
};
</script>

<style></style>
