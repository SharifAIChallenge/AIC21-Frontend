<template>
  <div class="tournaments">
    <SectionHeader title="تورنومنت ها" icon="mdi-tournament" />
    <div class="px-6 px-md-12">
      <TournamentHeader :header="header"></TournamentHeader>
      <v-row>
        <v-col cols="12" sm="6" md="4" xl="3" class="tournament my-4" v-for="tournament in tournaments" :key="tournament.id">
          <div>
            <TournamentCard :tournament="tournament"></TournamentCard>
          </div>
        </v-col>
      </v-row>
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
  async asyncData({ $axios }) {
    let res = await $axios.get('challenge/tournament');
    let tournaments = res.data.data;
    res = await $axios.get('challenge/tournament/next');
    let header = res.data.data;
    console.log(res.data.data);
    return { tournaments, header };
  },
  data() {
    return {
      header: {},
      tournaments: [],
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
