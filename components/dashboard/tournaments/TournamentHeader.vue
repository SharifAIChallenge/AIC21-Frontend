<template>
  <v-container>
    <v-row class="justify-space-between align-center pa-6 secondary">
      <div>
        <p>تورنومنت بعدی</p>
        <h2 class="mb-4 titleHeader">{{ header.title }}</h2>
        <div>
          <span>{{ header.date }}</span>
          - ساعت
          <span>{{ header.time }}</span>
        </div>
      </div>
      <Timer :deadline="header.deadline"></Timer>
    </v-row>
  </v-container>
</template>

<script>
import Timer from '~/components/dashboard/tournaments/Timer';
export default {
  components: { Timer },
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