<template>
  <div>
    <Notification class="pb-3" style="width:40%;margin-right:auto;" />
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
