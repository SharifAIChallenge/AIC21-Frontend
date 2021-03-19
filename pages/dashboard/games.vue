<template>
  <v-row class='d-flex game'>
    <v-col cols='12' :md='tabs===8 ? 8 : 6' class='pa-0'>
      <v-divider />
      <v-tabs-items v-model='tabs'>
        <v-tab-item>
          <div v-if='tabs===0' class='main-content'>
            <NewGame />
          </div>
        </v-tab-item>
        <v-tab-item>
          <div v-if='tabs===1' class='main-content pa-0'>
            <HistoryOfGames />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
    <v-col cols='12' :md='tabs=== 1 ? 4 : 6' class='pa-0' style='background: #080a18'>
      <div class='wrapper'>
        <div class='d-flex tabsW'>
          <v-tabs v-model='tabs' icons-and-text grow class='tabsWraper'>
            <div v-for='(item, key) in gamesHeader' :key='key' style='margin: 15px auto' class='d-flex flex-column'>
              <v-tab>
                {{ item.title }}
                <v-icon size='60' style='color: white'>{{ tabs === key ? item.icon : `${item.icon}-outline` }}</v-icon>
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

export default {
  layout: 'dashboard',
  components: {
    HistoryOfGames,
    NewGame,
  },
  data() {
    return {
      tabs: null,

      gamesHeader: [
        {
          title: 'جستجو با تیم ',
          icon: 'mdi-magnify',
        },
        {
          title: 'تاریخچه بازی ها',
          icon: 'mdi-history',
        },
      ],
    };
  },

};
</script>
<style lang='scss' scoped>
@import 'assets/variables.scss';
@import 'assets/mixins.scss';

.dashboard table {
  th,
  td {
    &:nth-of-type(1) {
      padding-right: 48px !important;
      @include v-not-md {
        padding-right: 24px !important;
      }
    }

    &:nth-last-of-type(1) {
      padding-left: 48px !important;
      text-align: left;
      @include v-not-md {
        padding-left: 24px !important;
      }
    }
  }

  th .v-icon {
    display: none;
  }

  td .mdi-plus-circle {
    margin-left: 0 !important;
  }
}

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

  .wrapper {
    display: flex;
    justify-content: center;
    @include v-not-md {
      display: block;
    }

    .tabsW {
      min-height: 100vh;
      position: fixed;
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