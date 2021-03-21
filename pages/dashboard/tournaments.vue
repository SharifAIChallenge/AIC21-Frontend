<template>
  <div class="tournaments">
    <SectionHeader title="تورنومنت ها" icon="mdi-tournament" />
    <div class="px-6 px-md-12">
      <TournamentHeader :header="header"></TournamentHeader>
    </div>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import TournamentHeader from '~/components/dashboard/tournaments/TournamentHeader';

export default {
  components: { SectionHeader, SectionContainer, TournamentHeader },
  layout: 'dashboard',
  transition: 'fade-transition',
  data() {
    return {
      header: {
        title: 'سیدبندی مقدماتی',
        date: '1400/01/10',
        time: '23:00:00',
        deadline: '2021-03-22T20:00:00',
      },
    };
  },
};
</script>
<style lang="scss">
</style>