<template>
  <div>
    <Notification class="pb-3" style="width: 33.333%; margin-right: auto; min-height: 100vh" />
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

<style scoped></style>
