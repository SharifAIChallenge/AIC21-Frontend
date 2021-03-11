<template>
  <div>
    <div v-if="this.invitationsList.status_code === 200">
      <SectionHeader title="دعوت دیگران به تیم" icon="mdi-account-plus-outline" />

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
          class="email-field"
        ></v-text-field>
        <div>
          <v-btn width="50vw" height="60px" class="text-h6" color="primary">
            <v-icon color="white" size="30px" class="pl-4 pr-2">mdi-script-outline</v-icon>
            ارسال دعوتنامه
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';

export default {
  components: { SectionHeader },

  data() {
    return {
      email: '',
      valid: false,
    };
  },
  methods: {
    sendInvitation() {
      if (this.email) {
        return;
      }
      let user_email = this.email;
      this.$axios.$post('team/invitations/team_sent', user_email).then(res => {
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

<style scoped>
.email-field {
  width: 50%;
}
</style>
