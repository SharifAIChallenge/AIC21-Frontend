<template>
  <div id="HeadTop">
    <Header color="transparent" />
  </div>
</template>

<script>
import Header from '../landing/Header.vue';
export default {
  components: { Header },
  layout: 'landing',
  auth: false,
};
</script>

<style scoped lang="scss">
#HeadTop {
  height: 100vh;
  transition: 0.4s;
}
</style>
