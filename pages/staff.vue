<template>
  <div>
    <app-header></app-header>
    <app-staffIntro v-bind:staffs="staffs"></app-staffIntro>
  </div>
</template>

<script>
import Header from '../components/staffs/Header';
import StaffIntro from '../components/staffs/StaffIntro';

export default {
  data() {
    return {
      staffs: [],
    };
  },
  auth: false,
  components: {
    'app-header': Header,
    'app-staffIntro': StaffIntro,
  },
  async asyncData({ $axios }) {
    let staffs = await $axios.$get('staff/staffs');
    return { staffs };
  },
};
</script>

<style scoped></style>
