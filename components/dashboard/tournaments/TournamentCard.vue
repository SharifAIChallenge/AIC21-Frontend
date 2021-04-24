<template>
  <div :class="['tournamentCard active d-flex flex-column pa-4']">
    <h3 class="mb-4">{{ tournament.name }}</h3>
    <div class="mb-4">
      <div class="d-flex mb-2">
        <v-icon class="ml-2">mdi-calendar-clock</v-icon>
        <span class="ml-2">شروع:</span>
        <date-time-formatter :date="tournament.start_time" />
      </div>
      <!-- <div class="d-flex mb-2">
        <span class="ml-2">پایان:</span>
        <date-time-formatter :date="tournament.end_time" />
      </div> -->
    </div>
    <v-btn class="py-5 card-btn" :to="`/dashboard/scoreboard?id=${tournament.id}`">
      مشاهده جدول امتیازات
    </v-btn>
    <v-btn class="py-5 mt-3 card-btn" :to="`/dashboard/games?id=${tournament.id}`">
      مشاهده بازی‌ها
    </v-btn>
  </div>
</template>

<script>
import DateTimeFormatter from '../../DateTimeFormatter';

export default {
  components: { DateTimeFormatter },
  props: {
    tournament: Object,
  },
};
</script>
<style lang="scss">
.tournament {
  .tournamentCard {
    width: 100%;
    background-color: #141432;
    a {
      background-color: #1a1940 !important;
    }
  }
  .active {
    background-color: #1a1940;
  }
  .card-btn {
    border: 2px solid white;
    &:hover {
      // color: var(--v-primary-base);
      // border: 2px solid var(--v-primary-base);
    }
  }
}
</style>
