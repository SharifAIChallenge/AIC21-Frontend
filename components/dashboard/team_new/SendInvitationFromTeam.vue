<template>
  <div>
    <div v-if="this.invitationsList.status_code === 200">
      <h1>
        <v-icon color="primary" size="40px" class="pl-2 pr-2">mdi-account-plus-outline</v-icon>
        دعوت دیگران به تیم
      </h1>
      <v-alert color="black" dark icon="mdi-information" width="50%" dense>
        اگر هم‌تیمی شما در سایت ثبت‌نلم کرده است، باوراد کردن ایمیل او را به تیمتان دعوت کنید.
      </v-alert>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="email"
          label="آدرس ایمیل هم‌تیمی"
          outlined
          dir="ltr"
          type="email"
          :rules="[v => !!v || 'ایمیل نمی تواند خالی باشد!', v => /.+@.+/.test(v) || 'لطفا ایمیل وارد کنید!']"
          required
          height="36px"
        ></v-text-field>
        <div>
          <v-btn width="50vw" height="60px" class="text-h6" color="primary" @click="sendInvitation()">
            <v-icon color="white" size="30px" class="pl-4 pr-2">mdi-script-outline</v-icon>
            ارسال دعوتنامه
          </v-btn>
        </div>
      </v-form>
      <div>
        <div class="pa-10">
          <v-icon color="white" size="30px" class="pl-4 pr-2">mdi-script-text-outline</v-icon>
          تاریخچه دعوت ها
        </div>
        <div v-for="(list, index) in invitationsList.data" :key="index">
          <div>
            <div>
              {{ list.user.first_name }} {{ list.user.last_name }}
              <v-icon :color="statusColor(list.status)" size="30px" class="pl-4 pr-2">{{ statusIcon(list.status) }}</v-icon>
              {{ statusMessage(list.status) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      تیم شما پر است
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  async fetch() {
    await this.$axios.$get('team/invitations/team_sent').then(res => {
      this.invitationsList = res;
    });
  },
  data() {
    return {
      email: '',
      valid: false,
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
    };
  },
  methods: {
    sendInvitation() {
      // if (this.email) {
      //   return;
      // }
      let user_email = this.email;
      this.$axios.$post('team/invitations/team_sent', {user_email}).then(res => {
        console.log(res);
        if (res.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.message));
          this.$axios.$get('team/invitations/team_sent').then(res => {
            this.invitationsList = res;
          });
        } else {
          this.$toast.error(this.translateResponseMessage(res.message));
        }
      });
    },
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
  },
};
</script>

<style scoped></style>
