<template>
  <v-container
    class="my-15"
    id="staff"
    v-intersect="{
      handler: onIntersecStaff,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <div class="mb-12 text-center white--text text-h2 font-weight-bold" width="100%">تیم ما</div>
    <v-row class="hidden-md-and-down justify-center">
      <v-col cols="12" lg="3" md="4" v-for="(staff, index) in staffs" class="d-flex justify-center mx-2" :key="index">
        <StaffCard :staff="staff" />
      </v-col>
    </v-row>
    <v-row class="hidden-lg-and-up">
      <div class="scroller d-flex">
        <StaffCard v-for="(staff, index) in staffs" :staff="staff" class="ml-6 my-3" :key="index" />
      </div>
    </v-row>
    <div class="d-flex justify-center my-15">
      <v-btn tile class="primary px-15 py-6 text-center">
        <span class="white--text font-weight-black" style="width:170px">
          مشاهده همه تیم ها
        </span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import StaffCard from './StaffCard';
export default {
  components: {
    StaffCard,
  },
  async fetch() {
    let data = await this.$axios.$get('homepage/staffs');
    this.staffs = data.data;
    console.log('this:', this.staffs);
  },
  data() {
    return {
      staffs: [],
    };
  },
  props: {
    onIntersecStaff: Function,
  },
};
</script>
<style scoped>
#staff {
  margin: 20vmin auto;
}
.scroller {
  overflow-x: auto;
}
</style>
