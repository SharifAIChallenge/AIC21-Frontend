<template>
  <div :class="[tournament.finished ? 'active' : '' , 'tournamentCard d-flex flex-column pa-4']">
    <h3 class="mb-4">{{tournament.title}}</h3>
    <div class="mb-4">
      <span>{{tournament.date}}</span>
      <span> - ساعت</span>
      <span>{{tournament.time}}</span>
    </div>
    <v-btn class="py-5" style="border:2px solid" v-if="tournament.finished" to=/dashboard/scoreboard >
    مشاهده جدول امتیازات
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    tournament: Object,
  },
};
</script>
<style lang="scss">
.tournaments {
  background-color: #0e1224;
  // border: 2px solid red;
}
.tournament {
  .tournamentCard {
    // border: 1px solid blue;
    height: 170px;
    width: 100%;
    background-color: #141432;
    a {
      background-color: #1a1940 !important;
    }
  }
  .active {
    background-color: #1a1940;
  }
}
</style>