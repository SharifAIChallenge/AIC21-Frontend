<template>
  <div class="main">
    <div class="main-forgot-form container">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <div class="forgot-title">
            <v-icon right size="45px" color="wihte">
              mdi-shield-sync-outline
            </v-icon>
            {{ $t('form.changePassword') }}
          </div>
          <form ref="form" @submit.prevent="resetPasswordConfirm">
            <password-input v-model="passes.newPassword1" label="form.newPassword" />
            <password-input v-model="passes.newPassword2" label="form.confirmNewPassword" />

            <v-row>
              <v-col>
                <v-btn block :loading="loading" type="submit" color="primary" height="50px" style="border-radius: 0; font-weight: normal;">
                  {{ $t('form.changePassword') }}
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </div>
    <v-btn width="100%" color="secondary" class="login-btn" height="50px" @click="changeStatus('login')">
      <v-icon style="margin:5px" size="25px">mdi-shield-star</v-icon>
      {{ $t('form.signIn') }}
    </v-btn>
  </div>
</template>

<script>
import { requiredRules } from '../../mixins/formValidations';
import PasswordInput from '../PasswordInput';
import { resetPasswordConfirm } from '../../api';

export default {
  components: { PasswordInput },
  mixins: [requiredRules],
  //   validate({ query }) {
  //     return query.uid && query.token;
  //   },
  data() {
    return {
      valid: false,
      passes: {
        newPassword1: '',
        newPassword2: '',
        uid: this.$route.query.uid,
        token: this.$route.query.token,
      },
      show: false,
      loading: false,
    };
  },
  methods: {
    toggleShow() {
      this.$store.commit('formStatus/toggleShow');
    },
    changeStatus(form) {
      this.$store.commit('formStatus/changeStatus', form);
    },
    async resetPasswordConfirm() {
      this.loading = true;
      let data = await resetPasswordConfirm(this.$axios, this.passes);
      this.loading = false;
      if (data.status_code) {
        if (data.status_code === 200) {
          this.$toast.success('رمز عبور با موفقیت تغییر یافت.');
          this.$router.push('/login');
        } else {
          this.$toast.error('خطا در تغییر رمز عبور.');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-forgot-form {
  margin: 100px auto;
  max-width: 500px;
}
.forgot-title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--v-primary-base);
  font-size: 40px;
  font-weight: bold;
}
.login-btn {
  position: fixed;
  font-size: 20px;
  font-weight: normal;
  bottom: 0;
  right: 0;
  border-radius: 0;
}
</style>
