<template>
  <div>
    <div id="profile-image" class="profile-image-class">
      <img :src="userData.image" :alt="userEmail" width="100%" />
    </div>
    <div>
      <div class="pt-2">{{ userData.firstname_fa }} {{ userData.lastname_fa }}</div>
      <div>
        <div class="pa-2">دانشگاه: {{ userData.university }}</div>
        <div class="pr-2">رشته: {{ userData.major }}</div>
        <div class="pa-2">مقطع: {{ userData.university_degree }}</div>
        <div class="pr-2 pb-2">ترم: {{ userData.university_term }}</div>
      </div>
    </div>
    <v-btn width="100%" height="60px" class="text-h6" color="primary" @click="sendInvitation(userEmail)">
      <v-icon color="white" size="30px" class="pl-4 pr-2">mdi-script-outline</v-icon>
      ارسال دعوتنامه
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ['userData', 'userEmail'],
  async fetch() {},
  data() {
    return {};
  },
  methods: {
    sendInvitation(email) {
      let user_email = email;
      this.$axios.$post('team/invitations/team_sent', user_email).then(res => {
        console.log(res);
        if (res.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.message));
        } else {
          this.$toast.error(this.translateResponseMessage(res.message));
        }
      });
    },
  },
};
</script>

<style>
/* .profile-image-class {
  background-image: url();
} */
</style>
