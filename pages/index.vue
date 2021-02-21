<template>
  <div id="main">
    <Header color="transparent" />
    <Video />
    <Intersection />
    <Sponsor />
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import Intersection from '~/components/landing/Intersection.vue';
import Video from '~/components/landing/video.vue';
import Sponsor from '~/components/landing/Sponsor'

export default {
  components: { Header, Video, Intersection, Sponsor },
  layout: 'landing',
  auth: false,
};
</script>

<style></style>
