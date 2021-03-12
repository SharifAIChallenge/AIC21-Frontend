<template>
  <div>
    <SectionHeader title="دعوتنامه های من" icon="mdi-script-outline" />
    <SectionContainer>
      <v-alert color="black" dark icon="mdi-information" width="80%" dense>
        در صورتی که تیم شما قابل جستجو باشد،لیست درخواست هایی را که افراد برای عضویت به شما ارسال کرده انددر اینجا می بینید!
      </v-alert>
      <div v-for="(list, index) in pendingList.data" :key="index">
        <div v-if="list.user.profile.image !== null">
          <div class="profile">
            <div>
              <img :src="list.user.profile.image" :alt="list.user.email" height="60px" class="ma-2" />
            </div>
            <div>
              <span>{{ list.user.profile.firstname_fa }} {{ list.user.profile.lastname_fa }}</span>
            </div>
            <div class="pr-4">
              <v-icon size="30px" dark @click="setCurrentUser(list.user.profile, list.user.email, list.user.id, false)" class="icon-hover">
                mdi-card-account-details-outline
              </v-icon>
            </div>
          </div>
        </div>
        <div v-else class="profile">
          <div class="profile">
            <div>
              <v-icon size="80px">
                mdi-alert-box
              </v-icon>
            </div>
            <div>
              <span>{{ list.user.profile.firstname_fa }} {{ list.user.profile.lastname_fa }}</span>
            </div>
            <div class="pr-4">
              <v-icon size="30px" dark @click="setCurrentUser(list.user.profile, list.user.email, list.user.id, false)" class="icon-hover">
                mdi-card-account-details-outline
              </v-icon>
            </div>
          </div>
        </div>
        <div class="mr-16">
          <v-btn height="50" class="ml-4" @click="rejectRequest(list.id)">
            رد کردن
          </v-btn>
          <v-btn color="primary" height="50" @click="acceptRequest(list.id)">
            <v-icon>
              mdi-handshake
            </v-icon>
            افزودن به تیم
          </v-btn>
        </div>
      </div>
      <div>
        <div class="pa-10">
          <v-icon color="white" size="30px" class="pl-4 pr-2">mdi-script-text-outline</v-icon>
          تاریخچه دعوت ها
          <v-alert color="black" dark icon="mdi-information" width="80%" dense>
            در این قسمت وضعیت دعوتنامه ها ارسالی را مشاهده می کنید!
          </v-alert>
        </div>
        <div class="pr-10">
          <div v-for="(list, index) in invitationsList.data" :key="index">
            <div>
              <div>
                {{ list.user.profile.firstname_fa }} {{ list.user.profile.firstname_fa }}
                <v-icon :color="statusColor(list.status)">{{ statusIcon(list.status) }}</v-icon>
                {{ statusMessage(list.status) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <v-dialog v-model="dialog" width="350">
        <div class="close-btn" @click="dialog = false">X</div>
        <UserProfileForTeam :userData="currentUser" />
      </v-dialog>
    </SectionContainer>
  </div>
</template>

<script>
import UserProfileForTeam from './UserProfileForTeam';
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';

export default {
  components: { UserProfileForTeam, SectionHeader, SectionContainer },
  async fetch() {
    await this.$axios.$get('team/invitations/team_sent').then(res => {
      this.invitationsList = res;
    });
    await this.$axios.$get('team/invitations/team_pending').then(res => {
      this.pendingList = res;
    });
  },
  data() {
    return {
      dialog: false,

      invitationsList: {
        // data: [
        //   {
        //     user: {
        //       first_name: 'علی',
        //       last_name: 'علی زاده',
        //       email: 'user1@user1.com',
        //     },
        //     status: 'accepted',
        //   },
        // ],
        // status_code: 200,
      },
      pendingList: {},
      currentUser: {
        profile: {},
        email: '',
        id: 0,
        show: true,
      },
    };
  },
  methods: {
    statusIcon(status) {
      if (status === 'pending') return 'mdi-progress-question';
      else if (status === 'accepted') return 'mdi-progress-check';
      else if (status === 'rejected') return 'mdi-progress-close';
    },
    statusColor(status) {
      if (status === 'pending') return 'blue';
      else if (status === 'accepted') return 'green';
      else if (status === 'rejected') return 'orange';
    },
    statusMessage(status) {
      if (status === 'pending') return 'در انتظار پاسخ';
      else if (status === 'accepted') return 'قبول کرد';
      else if (status === 'rejected') return 'رد کرد';
    },
    translateResponseMessage(response) {
      if (response === 'your invitation sent') return 'دعوت نامه ارسال شد!';
      else return 'مشکلی در ارسال دعوت نامه رخ داد! لطفا ایمیل را چک کنید!';
    },
    setCurrentUser(profile, email, id, show) {
      this.currentUser.profile = profile;
      this.currentUser.email = email;
      this.currentUser.id = id;
      this.currentUser.show = show;
      this.dialog = true;
    },
    acceptRequest(id) {
      // console.log('hi');
      this.$axios.$put(`team/invitations/team_pending/${id}?answer=1`).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('با موفقیت انجام شد!');
        } else {
          this.$toast.error('مشکلی رخ داده است!');
        }
      });
      this.$axios.$get('team/invitations/team_sent').then(res => {
        this.invitationsList = res;
      });
      this.$axios.$get('team/invitations/team_pending').then(res => {
        this.pendingList = res;
      });
    },
    rejectRequest(id) {
      // console.log('hi');
      this.$axios.$put(`team/invitations/team_pending/${id}?answer=0`).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('با موفقیت انجام شد!');
        } else {
          this.$toast.error('مشکلی رخ داده است!');
        }
      });
      this.$axios.$get('team/invitations/team_sent').then(res => {
        this.invitationsList = res;
      });
      this.$axios.$get('team/invitations/team_pending').then(res => {
        this.pendingList = res;
      });
    },
  },
};
</script>

<style scoped>
.email-field {
  width: 50%;
}
.profile {
  display: flex;
  align-items: center;
}
</style>
