<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="header"
            :items="team"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.image="{ item }">
              <img :src="item.image" :alt="item.name" height="60px" />
            </template>
            <template v-slot:item.profile="{ item }">
              <v-icon class="icon" @click="showTeam(item)">
                mdi-card-account-details-outline
              </v-icon>
            </template>
            <template v-slot:item.sendRequest="{ item }">
              <v-icon class="icon" @click="sendRequest(item.id)">
                mdi-plus-circle-outline
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-dialog v-model="teamDetails" width="350px">
        <v-card>
          <img :src="teamInfo.image" width="350px" :alt="teamInfo.name" />
          {{ teamInfo.name }}
          <v-container>
            <v-row v-for="(member, index) in teamInfo.members" :key="index">
              <v-col cols="2">
                <img :src="member.profile.image" :alt="member.first_name" height="40px" />
              </v-col>
              <v-col cols="10">
                <div class="d-flex align-center">
                  <v-col cols="10">
                    {{ member.first_name + '' + member.last_name }}
                  </v-col>
                  <v-col cols="2">
                    <v-icon @click="setCurrentUser(member.profile, member.email, member.id, false)">
                      mdi-card-account-details-outline
                    </v-icon>
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-btn color="primary" class="mt-5" @click="sendRequest(teamInfo.id)" width="100%" height="55px">ارسال درخواست عضویت</v-btn>
        </v-card>
      </v-dialog>
      <div>
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-container>
    <v-dialog v-model="ProfileDialog" width="350">
      <div class="close-btn" @click="ProfileDialog = false">X</div>
      <UserProfileForTeam :userData="currentUser" />
    </v-dialog>
  </div>
</template>
<script>
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';

export default {
  components: {
    UserProfileForTeam,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      teamDetails: false,
      ProfileDialog: false,
      teamInfo: {},
      header: [
        { text: 'تصویر', value: 'image' },
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
  methods: {
    sendRequest(team_id) {
      this.$axios.post('team/invitations/user_sent', { team_id }).then(res => {
        if (res.data.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.data.message));
        } else {
          this.$toast.error(this.translateResponseMessage(res.data.message));
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
      if (response === 'your invitation sent') return 'دعوت نامه ارسال شد!';
      else return 'مشکلی در ارسال دعوت نامه رخ داد!';
    },
  },
  async fetch() {
    await this.$axios.$get('/team/incomplete').then(res => {
      // this.incompleteTeams = res.data;
      console.log(res.results.data);
      this.team = res.results.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.icon {
  &:hover {
    color: var(--v-primary-base);
  }
}
</style>
