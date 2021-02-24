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
    <v-row class="hidden-md-and-down flex-nowrap justify-center">
      <v-col cols="12" lg="3" md="4" v-for="n in 4" class="d-flex justify-center mx-2" :key="n">
        <StaffCard />
      </v-col>
    </v-row>
    <v-row class="hidden-lg-and-up px-8">
      <div class="scroller d-flex">
        <StaffCard v-for="n in 4" :key="n" class="mx-1 my-3" />
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
