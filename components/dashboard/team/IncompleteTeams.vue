<template>
  <div>
    <SectionHeader title="جستجوی تیم‌ها" icon="mdi-badge-account-horizontal" />

    <div class="searchBar px-6 px-md-12">
      <div style="width: 70%">
        <v-text-field
          label="اسم تیم"
          outlined
          dense
          v-model="teamName"
          @keydown.enter="search(teamName)"
          height="50px"
          full-width
        ></v-text-field>
      </div>
      <div style="width: 20%">
        <v-btn block color="primary" @click="search(teamName)">
          <v-icon class="ml-0 ml-md-3">mdi-magnify</v-icon>
          <div class="hide-sm-and-down">تیم را پیدا کن</div>
        </v-btn>
      </div>
    </div>
    <v-data-table
      :headers="header"
      :items="team"
      :page.sync="page"
      :loading="tableLoading"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      style="background: #141432"
    >
      <template v-slot:[`item.name`]="{ item }">
        <div class="d-flex align-center">
          <img
            v-if="item.image_url"
            :src="item.image_url"
            :alt="item.name"
            height="60px"
            class="ml-2 mt-2"
            style="max-width: 60px; border-radius: 50%"
          />

          <span v-else class="emtyImage ml-1 my-2 d-none d-sm-block"></span>
          <div class="mr-2">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </template>
      <template v-slot:[`item.profile`]="{ item }">
        <v-icon class="icon" @click="showTeam(item)">mdi-card-account-details-outline</v-icon>
      </template>
      <template v-slot:[`item.sendRequest`]="{ item }">
        <div class="d-flex justify-center">
          <v-icon class="icon" @click="sendRequest(item.id)">mdi-plus-circle-outline</v-icon>
        </div>
      </template>
    </v-data-table>

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
            <img :src="member.profile.image_link" :alt="member.first_name" height="40px" style="max-width: 40px" />
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
    <div>
      <v-pagination v-model="page" :length="pageCount" total-visible="6" v-on:next="page + 1" @previous="page - 1"></v-pagination>
    </div>
    <v-dialog v-model="ProfileDialog" width="350">
      <v-btn icon class="close-btn" @click="ProfileDialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <UserProfileForTeam :userData="currentUser" />
    </v-dialog>
  </div>
</template>
<script>
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';
import SectionContainer from '~/components/SectionContainer';
import SectionHeader from '~/components/SectionHeader';

export default {
  components: {
    UserProfileForTeam,
    SectionContainer,
    SectionHeader,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      teamDetails: false,
      ProfileDialog: false,
      tableLoading: true,
      teamInfo: {},
      teamName: '',
      header: [
        { text: 'نام تیم', value: 'name' },
        { text: 'پروفایل', value: 'profile' },
        { text: 'ارسال درخواست عضویت', value: 'sendRequest' },
      ],
      team: [],
      currentUser: {
        profile: {},
        email: '',
        id: 0,
        show: true,
      },
    };
  },
  watch: {
    page: function () {
      this.changePage(this.page);
    },
  },
  methods: {
    search(name) {
      this.team = [];
      this.tableLoading = true;
      this.page = 1;
      this.$axios.get(`/team/incomplete?name=${name}`).then(res => {
        const count = 20;
        if (res.data.count % count === 0) {
          this.pageCount = res.data.count / count;
        } else {
          this.pageCount = Math.ceil(res.data.count / count);
        }
        if (res.data.count === 0) {
          this.$toast.error('تیمی با این نام وجود ندارد.');
        }
        this.team = res.data.results.data;
        this.tableLoading = false;
      });
      // this.teamName = '';
    },
    changePage(page) {
      this.tableLoading = true;
      this.team = [];
      if (this.teamName === '') {
        this.$axios.get(`/team/incomplete?page=${page}`).then(res => {
          this.team = res.data.results.data;
          this.tableLoading = false;
        });
      } else {
        this.$axios.get(`/team/incomplete?name=${this.teamName}&page=${page}`).then(res => {
          this.team = res.data.results.data;
          this.tableLoading = false;
        });
      }
    },
    sendRequest(team_id) {
      this.$axios.post('team/invitations/user_sent', { team_id }).then(res => {
        if (res.data.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.data));
        } else {
          this.$toast.error(this.translateResponseMessage(res.data));
        }
      });
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
    translateResponseMessage(response) {
      if (response.message === 'your invitation sent') return 'دعوت نامه ارسال شد!';
      else if (response.detail.detail === 'you have a sent an invitation already') return 'شما قبلا به این تیم دعوت‌نامه ارسال کردید! ';
      else return 'مشکلی در ارسال دعوت نامه رخ داد!';
    },
  },
  async fetch() {
    this.tableLoading = true;
    await this.$axios.$get('/team/incomplete').then(res => {
      this.team = res.results.data;
      const count = 20;
      if (res.count % count === 0) {
        this.pageCount = res.count / count;
      } else {
        this.pageCount = Math.ceil(res.count / count);
      }
    });
    this.tableLoading = false;
  },
};
</script>
<style lang="scss" scoped>
.emtyImage {
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.493);
  border-radius: 50%;
}
@import 'assets/mixins.scss';
.icon {
  &:hover {
    color: var(--v-primary-base);
  }
}

.searchBar {
  display: flex;
  justify-content: space-between;
  .hide-sm-and-down {
    @include v-not-sm {
      display: none;
    }
  }
}
</style>
