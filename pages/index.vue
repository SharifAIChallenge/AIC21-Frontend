<template>
  <div id="main">
    <HeadTop />
    <Intersection />
  </div>
</template>

<script>
import HeadTop from '~/components/landing/HeadTop.vue';
import Intersection from '~/components/landing/Intersection.vue';
export default {
  components: { HeadTop, Intersection },
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
