<template>
  <div>
    <v-data-table
      :headers="header"
      :items="team"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
      style="background: #141432"
    >
      <template v-slot:item.image="{ item }">
        <img v-if="item.image" :src="item.image" :alt="item.name" height="60px" style="max-width: 60px" />
      </template>
      <template v-slot:item.profile="{ item }">
        <v-icon class="icon" @click="showTeam(item)">mdi-card-account-details-outline</v-icon>
      </template>
      <template v-slot:item.sendRequest="{ item }">
        <div class="d-flex justify-center">
          <v-icon class="icon" @click="sendRequest(item.id)">mdi-plus-circle-outline</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="teamDetails" width="350px">
      <v-card>
        <img v-if="teamInfo.image" :src="teamInfo.image" width="100%" :alt="teamInfo.name" />
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
                {{ member.profile.firstname_fa + '' + member.profile.lastname_fa }}
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
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
    <v-dialog v-model="ProfileDialog" width="350">
      <v-btn icon class="close-btn" @click="ProfileDialog = false">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
      <UserProfileForTeam :userData="currentUser" />
    </v-dialog>
  </div>
</template>
<script>
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';
import SectionContainer from '~/components/SectionContainer';

export default {
  components: {
    UserProfileForTeam,
    SectionContainer,
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
      else if (response.detail.detail === 'you have a sent an invitation already') return 'شما قبلا به این کاربر دعوت‌نامه ارسال کردید! ';
      else return 'مشکلی در ارسال دعوت نامه رخ داد!';
    },
  },
  async fetch() {
    await this.$axios.$get('/team/incomplete').then(res => {
      // this.incompleteTeams = res.data;
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
