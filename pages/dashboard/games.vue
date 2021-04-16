<template>
  <v-row class="d-flex game ma-0">
    <v-col cols="12" md="8" class="pa-0">
      <v-divider />
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <div v-if="tabs === 0" class="main-content">
            <NewGame />
          </div>
        </v-tab-item>
        <v-tab-item>
          <div v-if="tabs === 1" class="main-content pa-0">
            <HistoryOfGames />
          </div>
        </v-tab-item>
        <v-tab-item>
          <div v-if="tabs === 2" class="main-content pa-0">
            <GameInvites />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
    <v-col cols="12" md="4" class="pa-0 gameTabs" style="background: #080a18">
      <div class="wrapper">
        <div class="d-flex tabsW">
          <v-tabs v-model="tabs" icons-and-text grow class="tabsWraper">
            <div v-for="(item, key) in gamesHeader" :key="key" style="margin: 15px auto" class="d-flex flex-column">
              <v-tab :disabled="item.gard && !haveFinalSubmit">
                {{ item.title }}
                <v-icon size="60" style="color: white">{{ item.icon }}</v-icon>
              </v-tab>
            </div>
          </v-tabs>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import HistoryOfGames from '~/components/dashboard/games_new/HistoryOfGames';
import NewGame from '~/components/dashboard/games_new/NewGame';
import GameInvites from '~/components/dashboard/games_new/GameInvites';

export default {
  layout: 'dashboard',
  components: {
    HistoryOfGames,
    NewGame,
    GameInvites,
  },
  async asyncData({ $axios, query }) {
    let tabs = query.id ? 1 : 0;
    let res = await $axios.$get('/challenge/lobby');
    let haveFinalSubmit = true;
    if (res.status_code === 403) {
      haveFinalSubmit = false;
    }

    return { haveFinalSubmit, tabs };
  },
  data() {
    return {
      tabs: null,
      gamesHeader: [
        {
          title: 'جستجو با تیم ',
          icon: 'mdi-magnify',
          gard: false,
        },
        {
          title: 'تاریخچه بازی ها',
          icon: 'mdi-history',
          gard: false,
        },
        {
          title: 'دعوت‌نامه‌ها',
          icon: 'mdi-script-text',
          gard: true,
        },
      ],
      haveFinalSubmit: true,
    };
  },
};
</script>
<style lang="scss">
@import 'assets/variables.scss';
@import 'assets/mixins.scss';

.game {
  @include v-not-md {
    flex-wrap: wrap;
    flex-flow: column-reverse;
    > div {
      width: 100vw;
    }
  }

  .v-tab--active {
    background-color: var(--v-secondary-base) !important;
    color: white !important;
  }

  .v-tab {
    width: 150px;
    height: 150px;
    background: map-get($material-dark-elevation-colors, '16');
    color: white !important;
  }

  hr {
    display: none;
  }

  .v-tabs-slider-wrapper {
    display: none;
  }

  .main-content {
    min-height: 100vh;
    background-color: map-get($material-dark-elevation-colors, '12');
  }

  .gameTabs {
    @include md {
      position: fixed;
      left: 0;
      width: 28%;
      z-index: 10;
    }
  }

  .wrapper {
    display: flex;
    justify-content: center;
    @include v-not-md {
      display: block;
    }

    .tabsW {
      min-height: 100vh;
      // position: fixed;
      // width: calc(50% - 136px);

      @include v-not-md {
        position: relative;
        width: auto;
        min-height: 150px;
      }
    }
  }

  .tabsWraper .v-item-group {
    min-height: 100vh;
    @include v-not-md {
      min-height: 150px;
    }

    .v-slide-group__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      @include v-not-md {
        flex-direction: row;
        > div {
          margin: 0 !important;
          width: 33.3333%;

          > div {
            width: 100% !important;
          }
        }
      }
    }
  }

  input {
    text-align: right;
  }
}
</style>
