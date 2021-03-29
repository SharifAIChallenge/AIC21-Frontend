<template>
  <v-card>
    <img v-if="userData.profile.image_link !== null" :src="userData.profile.image_link" width="100%" />
    <div class="pa-2 pt-1 title-profile ">
      <div>{{ userData.profile.firstname_fa }} {{ userData.profile.lastname_fa }}</div>
      <div>
        <v-btn icon :href="userData.profile.github" target="_blank">
          <v-icon :disabled="userData.profile.linkedin === null">
            mdi-linkedin
          </v-icon>
        </v-btn>
        <v-btn icon :href="userData.profile.github" target="_blank">
          <v-icon :disabled="userData.profile.github === null">
            mdi-github
          </v-icon>
        </v-btn>
        <v-btn icon :href="userData.profile.resume" target="_blank">
          <v-icon :disabled="userData.profile.resume === null">
            mdi-file-account
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-container class="pt-0 mt-0">
      <div class="pr-8 pb-4">
        <ul>
          <li>دانشگاه: {{ userData.profile.university }}</li>
          <li>رشته تحصیلی: {{ userData.profile.major }}</li>
          <li>مقطع: {{ universityDegree(userData.profile.university_degree) }}</li>
          <li>سال ورود: {{ userData.profile.birth_date }}</li>
        </ul>
      </div>
    </v-container>
    <div class="" v-if="userData.show">
      <v-btn width="100%" height="55px" class="text-h6" color="primary" @click="sendInvitation(userEmail)" block :loading="loadingBtn">
        <v-icon color="white" size="30px" class="pl-2 pr-2">mdi-script-outline</v-icon>
        ارسال دعوتنامه
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['userData'],
  data() {
    return {
      data: {
        loadingBtn: false,
      },
    };
  },
  methods: {
    sendInvitation(email) {
      this.loadingBtn = true;
      let user_email = email;
      this.$axios.$post('team/invitations/team_sent', { user_email }).then(res => {
        if (res.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.message));
        } else {
          this.$toast.error(this.translateResponseMessage(res.message));
        }
      });
      this.loadingBtn = false;
    },
    translateResponseMessage(response) {
      if (response === 'your invitation sent') return 'دعوت نامه ارسال شد!';
      else if (response === 'you have a sent an invitation already') return 'شما قبلا دعوت نامه ارسال کردید!';
      else return 'مشکلی در ارسال دعوت نامه رخ داد!';
    },
    universityDegree(response) {
      if (response === 'ST') return 'دانش آموز';
      else if (response === 'BA') return 'کارشناسی';
      else if (response === 'MA') return 'کارشناسی ارشد';
      else if (response === 'DO') return 'دکترا';
    },
  },
};
</script>

<style scoped lang="scss">
.title-profile {
  display: flex;
  justify-content: space-between;
}
</style>
