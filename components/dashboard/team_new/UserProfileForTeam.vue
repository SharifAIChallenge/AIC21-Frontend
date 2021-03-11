<template>
  <v-card>
    <img v-if="userData.profile.image !== null" :src="userData.profile.image" width="100%" :alt="userData.profile.name" />
    <div class="pa-2 pt-1">{{ userData.profile.firstname_fa }} {{ userData.profile.lastname_fa }}</div>
    <v-container class="pt-0 mt-0">
      <div class="pr-8 pb-4">
        <ul>
          <li>شهر: {{ userData.profile.province }}</li>
          <li>دانشگاه: {{ userData.profile.university }}</li>
          <li>رشته تحصیلی: {{ userData.profile.major }}</li>
          <li>مقطع: {{ userData.profile.university_degree }}</li>
          <li>ترم: {{ userData.profile.university_term }}</li>
        </ul>
      </div>
      <div class="social">
        <div>
          <a :href="userData.profile.linkedin" target="_blank">
            <v-icon :disabled="userData.profile.linkedin === null">
              mdi-linkedin
            </v-icon>
          </a>
        </div>
        <div>
          <v-btn :href="userData.profile.github" target="_blank">
            <v-icon :disabled="userData.profile.github === null" :to="userData.profile.github" target="_blank">
              mdi-github
            </v-icon>
          </v-btn>
        </div>
        <div>
          <v-btn :href="userData.profile.resume" target="_blank">
            <v-icon :disabled="userData.profile.resume === null" :to="userData.profile.resume" target="_blank">
              mdi-file-account
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-container>
    <div class="" v-if="userData.show">
      <v-btn width="100%" height="55px" class="text-h6" color="primary" @click="sendInvitation(userEmail)">
        <v-icon color="white" size="30px" class="pl-2 pr-2">mdi-script-outline</v-icon>
        ارسال دعوتنامه
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['userData'],
  // async fetch() {
  //   this.$axios.$get(`accounts/profile/${this.id}`).then(res => {
  //     console.log(res);
  //   });
  // },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    sendInvitation(email) {
      let user_email = email;
      this.$axios.$post('team/invitations/team_sent', { user_email }).then(res => {
        if (res.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.message));
        } else {
          this.$toast.error(this.translateResponseMessage(res.message));
        }
      });
    },
    translateResponseMessage(response) {
      if (response === 'your invitation sent') return 'دعوت نامه ارسال شد!';
      else return 'مشکلی در ارسال دعوت نامه رخ داد! لطفا ایمیل را چک کنید!';
    },
  },
};
</script>

<style scoped lang="scss">
.social {
  display: flex;
  justify-content: space-evenly;
}
</style>
