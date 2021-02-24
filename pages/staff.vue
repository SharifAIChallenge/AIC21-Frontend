<template>
  <div>
    <app-header></app-header>

    <app-staffIntro v-for="group in groups" :key="group" :group="staffs[group]"></app-staffIntro>
    <!-- <div v-for="group in groups" :key="group">{{ staffs[group] }}</div> -->
  </div>
</template>

<script>
import Header from '../components/staffs/Header';
import StaffIntro from '../components/staffs/StaffIntro';

export default {
  auth: false,
  components: {
    'app-header': Header,
    'app-staffIntro': StaffIntro,
  },
  async asyncData({ $axios }) {
    let staffs = await $axios.$get('staff/staffs');
    return { staffs };
  },
  computed: {
    groups() {
      return Object.keys(this.staffs);
    },
  },
};
</script>

<style scoped></style>
