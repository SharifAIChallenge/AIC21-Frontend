<template>
  <div>
    <div class='searchBar px-6 px-md-12'>
      <div style='width:70%;'>
        <v-text-field
          label='اسم تیم'
          outlined
          dense
          v-model='teamName'
          @keydown.enter='search(teamName)'
          height='50px'
          full-width
        ></v-text-field>
      </div>
      <div style='width:20%;'>
        <v-btn block color='primary' @click='search(teamName)'>
          <v-icon class='ml-0 ml-md-3'>
            mdi-magnify
          </v-icon>
          <div class='hide-sm-and-down'>
            تیم را پیدا کن
          </div>
        </v-btn>
      </div>
    </div>
    <div>
      <v-row>
        <v-col cols='6' class='px-0'>
          <v-btn color='primary' width='100%' max-height='100%'>
            <v-icon large class='pl-5'>mdi-robot</v-icon>
            درخواست بازی با بات
          </v-btn>
        </v-col>
        <v-col class='px-0' cols='6'>
          <v-btn color='primary' width='100%'>
            <v-icon large class='pl-5'>mdi-shuffle-variant</v-icon>
            انتخاب تیم رندوم
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-data-table
        :headers='headers'
        :items='teams'
        :page.sync='page'
        :items-per-page='itemsPerPage'
        hide-default-footer
        :loading='tableLoading'
      >
        <template v-slot:item.profile='{ item }'>
          <v-icon @click='showTeam(item)' class='ProfileIcon'>mdi-card-account-details-outline</v-icon>
        </template>
        <template v-slot:item.play='{ item }'>
          <v-btn color='primary' @click='sendGameRequest(item.id)'>درخواست بازی</v-btn>
        </template>
      </v-data-table>
      <div>
        <v-pagination v-model='page' :length='pageCount'></v-pagination>
      </div>
      <v-dialog v-model="teamDetails" width="350px">
        <v-btn icon class="close-btn" @click="teamDetails = false">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-card>
          <img v-if="teamInfo.image" :src="teamInfo.image" style="max-width: 100%" :alt="teamInfo.name" />
          <div class="pa-3">
            {{ teamInfo.name }}
          </div>

          <v-row v-for="(member, index) in teamInfo.members" :key="index" class="pa-3" style="width: 100%">
            <v-col cols="2">
              <img :src="member.profile.image" :alt="member.first_name" height="40px" style="max-width: 40px" />
            </v-col>
            <v-col cols="10">
              <div class="d-flex align-center">
                <v-col cols="10">
                  {{ member.profile.firstname_fa + ' ' + member.profile.lastname_fa }}
                </v-col>
                <v-col cols="2">
                  <v-icon @click="setCurrentUser(member.profile, member.email, member.id, false)">
                    mdi-card-account-details-outline
                  </v-icon>
                </v-col>
              </div>
            </v-col>
          </v-row>
<!--          <v-btn color="primary" block class="mt-5" @click="sendRequest(teamInfo.id)" width="100%" height="55px">ارسال درخواست عضویت</v-btn>-->
        </v-card>
      </v-dialog>
      <v-dialog v-model='ProfileDialog' width='350'>
        <v-btn icon class='close-btn' @click='ProfileDialog = false'>
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <UserProfileForTeam :userData='currentUser' />
      </v-dialog>
    </div>
  </div>
</template>
<script>
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';

export default {
  components: { UserProfileForTeam },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      tableLoading: false,
      teamName: '',
      teamInfo:{},
      ProfileDialog:false,
      teamDetails:false,
      teams: [],
      headers: [
        { text: 'نام تیم', value: 'name' },
        { text: 'پروفایل', value: 'profile' },
        { text: 'بازی دوستانه', value: 'play' },
      ],
      currentUser: {
        profile: {},
        email: '',
        id: 0,
        show: true,
      },

    };
  },
  watch: {
    page: function() {
      this.changePage(this.page);
    },
  },
  methods: {
    search(name) {
      this.team = [];
      this.tableLoading = true;
      this.page = 1;
      this.$axios.get(`/team/all-teams?name=${name}`).then(res => {
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
    showTeam(team) {
      this.teamDetails = true;
      this.teamInfo=team;
    },
    changePage(page) {
      this.tableLoading = true;
      this.teams = [];
      if (this.teamName === '') {
        this.$axios.get(`/team/all-teams?page=${page}`).then(res => {
          this.teams = res.data.results.data;
          this.tableLoading = false;
        });
      } else {
        this.$axios.get(`/team/all-teams?name=${this.teamName}&page=${page}`).then(res => {
          this.teams = res.data.results.data;
          this.tableLoading = false;
        });
      }
    },
    setCurrentUser(profile, email, id, show) {
      this.teamDetails = false;
      this.currentUser.profile = profile;
      this.currentUser.email = email;
      this.currentUser.id = id;
      this.currentUser.show = show;
      this.ProfileDialog = true;
    },
    sendGameRequest(teamId){
      this.$axios.$post('/api/challenge/request',{type:'friendly_match',target_team:`${teamId}`}).then(res =>{

      })
    }
  },
  async fetch() {
    this.tableLoading = true;
    await this.$axios.$get('/team/all-teams').then(response => {
      console.log(response);
      this.teams = response.results.data;
      console.log(this.teams);
      const count = 20;
      if (response.count % count === 0) {
        this.pageCount = response.count / count;
      } else {
        this.pageCount = Math.ceil(response.count / count);
      }
    });
    this.tableLoading = false;
  },
};
</script>
<style scoped lang='scss'>
@import 'assets/mixins.scss';

.searchBar {
  display: flex;
  justify-content: space-between;

  .hide-sm-and-down {
    @include v-not-sm {
      display: none;
    }
  }
}

.ProfileIcon {
  &:hover {
    color: var(--v-primary-base);
  }
}
</style>