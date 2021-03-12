<template>
  <div>
    <Notification class="pb-3 notif" style="margin-right: auto; min-height: 100vh" />
  </div>
</template>

<script>
import Notification from '~/components/dashboard/Notification';
export default {
  layout: 'dashboard',
  transition: 'fade-transition',
  components: {
    Notification,
  },
};
</script>

<style scoped lang="scss">
@import '~/assets/mixins.scss';
.notif {
  width: 33.333%;
  @include v-not-md {
    width: 100%;
  }
}
</style>
