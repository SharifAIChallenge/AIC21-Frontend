<template>
  <v-container v-if="header.start_time">
    <v-row class="justify-space-between align-center pa-6 secondary">
      <div>
        <p>تورنومنت بعدی</p>
        <h2 class="mb-4 titleHeader">{{ header.name }}</h2>
        <div class="mb-4 mb-sm-0">
          <div class="d-flex mb-2" v-if="header.start_time">
            <span class="ml-2">شروع:</span>
            <date-time-formatter :date="header.start_time" />
          </div>
        </div>
      </div>
      <Timer v-if="header.start_time" :deadline="header.start_time"></Timer>
    </v-row>
  </v-container>
</template>

<script>
import Timer from '~/components/dashboard/tournaments/Timer';
import DateTimeFormatter from '../../DateTimeFormatter';

export default {
  components: { Timer, DateTimeFormatter },
  props: {
    header: Object,
  },
};
</script>
<style lang="scss">
.tournaments {
  .titleHeader {
    font-size: 2rem;
  }
}
</style>
