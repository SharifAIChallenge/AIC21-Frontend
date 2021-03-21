<template>
  <div class="tournaments">
    <SectionHeader title="تورنومنت ها" icon="mdi-tournament" />
    <div class="px-6 px-md-12">
      <TournamentHeader :header="header"></TournamentHeader>
      <div class="py-8 d-flex flex-wrap justify-space-between">
        <div class="tournament pa-0 my-4" v-for="tournament in tournaments" :key="tournament.date">
          <div>
            <TournamentCard :tournament="tournament"></TournamentCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import TournamentHeader from '~/components/dashboard/tournaments/TournamentHeader';
import TournamentCard from '~/components/dashboard/tournaments/TournamentCard';

export default {
  components: { SectionHeader, SectionContainer, TournamentHeader, TournamentCard },
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
      tournaments: [
        {
          title: 'تورنومنتی که تمام شده',
          date: '1400/01/10',
          time: '23:00:00',
          deadline: '2021-03-22T20:00:00',
          finished: true,
        },
        {
          title: 'تورنومنتی که تمام شده',
          date: '1400/01/10',
          time: '23:00:00',
          deadline: '2021-03-22T20:00:00',
          finished: true,
        },
        {
          title: 'تورنومنتی که شروع نشده',
          date: '1400/01/10',
          time: '23:00:00',
          deadline: '2021-03-22T20:00:00',
          finished: false,
        },
        {
          title: 'تورنومنتی که شروع نشده',
          date: '1400/01/10',
          time: '23:00:00',
          deadline: '2021-03-22T20:00:00',
          finished: false,
        },
      ],
    };
  },
};
</script>
<style lang="scss">
@import '~/assets/mixins.scss';
.tournament {
  width: 32%;
  @include v-not-sm {
    width: 100%;
  }
}
</style>