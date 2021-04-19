<template>
  <v-app>
    <div class="scoreboard">
      <div class="d-flex justify-space-between align-center pl-6 pl-md-12">
        <SectionHeader title="جدول امتیازات" icon="mdi-scoreboard-outline" />
        <!-- <div class="d-flex align-center">
          <v-select
            v-model="scoreboardSelect"
            :items="scoreboardItems"
            item-text="table"
            item-value="src"
            label="تورنومنت"
            persistent-hint
            :hint="`${scoreboardSelect.src}`"
            @change="changeTable"
            outlined
          ></v-select>
        </div> -->
      </div>
      <v-data-table
        :loading="tableLoading"
        hide-default-footer
        center
        :headers="headers"
        :items="data"
        :page.sync="page"
        :items-per-page="itemPerPage"
        style="background: #141432"
        :class="'page-' + page"
      >
        <template v-slot:item.rank="{ item, index }">
          <span>{{ (page - 1) * 20 + (index + 1) }}</span>
        </template>
        <template v-slot:item.name="{ item }">
          <div class="d-flex align-center">
            <img
              v-if="item.team.image_url"
              :src="item.team.image_url"
              height="60px"
              class="my-2"
              style="max-width: 60px; width: 60px; border-radius: 50%"
            />
            <span v-else class="emtyImage ml-1 my-2 d-none d-sm-block"></span>
            <div class="mr-3">
              <span>{{ item.team.name }}</span>
            </div>
          </div>
        </template>
        <template v-slot:item.profile="{ item }">
          <v-icon class="icon" @click="showTeam(item.team)">mdi-card-account-details-outline</v-icon>
        </template>
      </v-data-table>
      <div class="text-center pt-4 pb-10" style="position: relative">
        <v-pagination v-model="page" :length="pageCount" total-visible="6"></v-pagination>
        <Logo />
      </div>
      <v-dialog v-model="teamDetails" width="350px">
        <v-btn icon class="close-btn" @click="teamDetails = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card>
          <img v-if="teamInfo.image_url" :src="teamInfo.image_url" style="max-width: 100%" />
          <div class="pa-3">
            {{ teamInfo.name }}
          </div>

          <v-row v-for="(member, index) in teamInfo.members" :key="index" class="pa-3" style="width: 100%">
            <v-col cols="2">
              <img :src="member.profile.image_link" height="40px" style="max-width: 40px" />
            </v-col>
            <v-col cols="10">
              <div class="d-flex align-center">
                <v-col cols="10">
                  {{ member.profile.firstname_fa + ' ' + member.profile.lastname_fa }}
                </v-col>
                <v-col cols="2">
                  <v-icon @click="setCurrentUser(member.profile, member.email, member.id, false)">mdi-card-account-details-outline</v-icon>
                </v-col>
              </div>
            </v-col>
          </v-row>
          <v-btn color="primary" block class="mt-5" @click="sendRequest(teamInfo.id)" width="100%" height="55px">ارسال درخواست عضویت</v-btn>
        </v-card>
      </v-dialog>
      <v-dialog v-model="ProfileDialog" width="350">
        <v-btn icon class="close-btn" @click="ProfileDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <UserProfileForTeam :userData="currentUser" />
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';
import Logo from '~/components/dashboard/Logo';

export default {
  components: { SectionHeader, SectionContainer, UserProfileForTeam, Logo },
  layout: 'dashboard',
  transition: 'fade-transition',

  async asyncData({ $axios, query }) {
    let url = query.id ? `challenge/scoreboard/${query.id}` : 'challenge/friendly_scoreboard';
    const res = await $axios.$get(url);
    const data = res.results.data;
    const count = 20;
    const pageCount = Math.ceil(res.count / count);
    return { data, pageCount, url };
  },
  data() {
    return {
      tableLoading: false,
      dialog: false,
      filter: false,
      page: 1,
      url: '',
      pageCount: 0,
      itemPerPage: 20,
      scoreboardSelect: { table: 'تورنومنت ۱', src: 'tour1' },
      scoreboardItems: [
        { table: 'تورنومنت ۱', src: 'tour1' },
        { table: 'تورنومنت ۲', src: 'tour2' },
      ],
      headers: [
        {
          text: 'رتبه',
          align: 'right',
          value: 'rank',
        },
        {
          text: 'نام',
          align: 'right',
          value: 'name',
        },
        { text: 'امتیاز', align: 'center', value: 'score' },
        { text: 'برد', align: 'center', value: 'wins' },
        { text: 'باخت', align: 'center', value: 'losses' },
        { text: 'پروفایل', align: 'center', value: 'profile' },
      ],
      data: [],
      ProfileDialog: false,
      teamDetails: false,
      teamInfo: {},
      currentUser: {
        profile: {},
        email: '',
        id: 0,
        show: true,
      },
      status_code: 200,
    };
  },
  methods: {
    changeTable(url) {
      this.$router.push({ path: '/dashboard/scoreboard?q=' + url });
      this.getData(url);
    },
    getData(param) {
      this.tableLoading = true;
      this.$axios.$get(`${this.url}?page=${this.page}`).then(res => {
        if (res.status_code === 200) {
          this.data = res.results.data;
          this.status_code = res.status_code;
          const count = 20;
          this.pageCount = Math.ceil(res.count / count);
        } else {
          this.$toast.error('خطا در برقراری ارتباط!');
        }
      });
      this.tableLoading = false;
    },
    showTeam(team) {
      this.teamDetails = true;
      this.teamInfo = team;
    },
    setCurrentUser(profile, email, id, show) {
      this.teamDetails = false;
      this.currentUser.profile = profile;
      this.currentUser.email = email;
      this.currentUser.id = id;
      this.currentUser.show = show;
      this.ProfileDialog = true;
    },
  },
  watch: {
    page: function() {
      this.getData(this.page);
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/variables.scss';
@import '~/assets/mixins.scss';
.scoreboard {
  @include v-sm {
    .page-1 {
      table tbody tr {
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          color: var(--v-bg-base);
          background-color: var(--v-secondary-darken2);
          button {
            color: var(--v-bg-base);
          }
          &:hover {
            background-color: var(--v-secondary-darken3) !important;
          }
        }
      }
    }
  }
  .emtyImage {
    width: 60px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.493);
    border-radius: 50%;
  }
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-text-field__details {
    display: none;
  }
}
.v-data-table__empty-wrapper td {
  text-align: center !important;
}
</style>
