<template>
  <v-container class="my-15">
    <div class="mb-12 text-center white--text text-h3 font-weight-bold" width="100%">تیم ما</div>
    <v-row class="hidden-sm-and-down">
      <v-col cols="12" lg="3" md="4" v-for="n in 4" class="d-flex justify-center px-2" :key="n">
        <StaffCard />
      </v-col>
    </v-row>
    <v-row class="hidden-md-and-up px-8">
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
};
</script>
<style scoped>
.scroller {
  overflow-x: auto;
}
</style>
