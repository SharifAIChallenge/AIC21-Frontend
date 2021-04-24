<template>
  <div class="tournaments">
    <SectionHeader title="تورنومنت ها" icon="mdi-tournament" />
    <div class="px-6 px-md-12">
      <TournamentHeader :header="header"></TournamentHeader>
      <v-card color="basil">
        <!-- <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-3 basil--text">
            BASiL
          </h1>
        </v-card-title> -->

        <v-tabs v-model="tabs" color="primary" grow>
          <v-tab>
            دوستانه
          </v-tab>
          <v-tab>
            سیدبندی
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="4" xl="3" class="tournament my-4" v-for="tournament in tournaments" :key="tournament.id">
                    <div>
                      <TournamentCard :tournament="tournament"></TournamentCard>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>
                <v-row v-if="finalTournaments.length">
                  <v-col cols="12" sm="6" md="4" xl="3" class="tournament my-4" v-for="tournament in finalTournaments" :key="tournament.id">
                    <div>
                      <TournamentCard :tournament="tournament"></TournamentCard>
                    </div>
                  </v-col>
                </v-row>
                <div v-else>
                  <div class="d-flex justify-center py-15">
                    <h3>
                      اوپس! تورنمنتی یافت نشد
                    </h3>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
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
    let data = res.data.data;
    console.log(data);
    let tournaments = data.filter(t => t.type !== 'final');
    let finalTournaments = data.filter(t => t.type === 'final');

    res = await $axios.get('challenge/tournament/next');
    let header = res.data.data;
    console.log(res.data.data);
    return { tournaments, header, finalTournaments };
  },
  data() {
    return {
      tabs: null,
      header: {},
      tournaments: [],
      finalTournaments: [],
    };
  },
};
</script>
<style lang="scss">
@import '~/assets/mixins.scss';
.tournaments {
  .v-tab {
    color: white !important;
    &.v-tab--active {
      color: var(--v-primary-base) !important;
    }
  }

  .tournament {
    width: 32%;
    @include v-not-sm {
      width: 100%;
    }
  }
}
</style>
