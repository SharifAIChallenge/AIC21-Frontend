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
    <div class="mb-12" width="100%">
      <div class="text-center white--text text-h2 font-weight-bold">
        تیم ما
      </div>
    </div>
    <!-- <v-row class="hidden-md-and-down justify-center">
      <v-col cols="12" lg="3" md="4" v-for="(staff, index) in staffs" class="d-flex justify-center mx-2" :key="index">
        <StaffCard :staff="staff" />
      </v-col>
    </v-row> -->

    <div class="d-flex pr-2 scroller">
      <!-- <v-col cols="5"> -->
      <StaffCard v-for="(staff, index) in staffs" :staff="staff" class="ml-6 my-3" :key="index" />
      <!-- </v-col> -->
    </div>
    <div style="max-width: 230px; margin: 70px auto">
      <v-btn tile block to="/staff">
        مشاهده همه تیم ها
      </v-btn>
    </div>
    <v-icon class="arrow" large>
      mdi-arrow-left
    </v-icon>
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
<style scoped lang="scss">
@import '../../../assets/mixins.scss';
#staff {
  margin: 20vmin auto;
  position: relative;
  .arrow {
    position: absolute;
    left: 60px;
    bottom: -10px;
    @include not-md {
      left: 20px;
    }
  }

  .scroller {
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
