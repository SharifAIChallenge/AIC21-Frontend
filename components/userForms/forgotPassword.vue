<template>
  <div class="main">
    <div class="main-forgot-form container">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <div class="forgot-title">
            <v-icon right size="45px" color="wihte">mdi-shield-sync-outline</v-icon>
            {{ $t('form.forgotPassword') }}
          </div>
          <form ref="form" @submit.prevent="resetPassword">
            <v-text-field
              :label="$t('form.email')"
              v-model="email"
              type="email"
              :rules="emailRules"
              required
              outlined
              dir="ltr"
              height="36px"
              autofocus
            ></v-text-field>

            <v-row>
              <v-col>
                <v-btn block :loading="loading" type="submit" color="primary" height="50px" style="border-radius: 0; font-weight: normal">
                  {{ $t('form.sendResetInstructions') }}
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </div>
    <v-btn width="100%" color="secondary" class="login-btn" height="50px" @click="changeStatus('login')">
      <v-icon style="margin: 5px" size="25px">mdi-shield-star</v-icon>
      {{ $t('form.signIn') }}
    </v-btn>
  </div>
</template>

<script>
import { emailRules, requiredRules } from '../../mixins/formValidations';
import { resetPassword } from '../../api';

export default {
  mixins: [requiredRules, emailRules],
  data() {
    return {
      valid: false,
      email: '',
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
    async resetPassword() {
      this.loading = true;
      let data = await resetPassword(this.$axios, this.email);
      this.loading = false;
      if (data.status_code) {
        if (data.status_code === 200) {
          this.$toast.success('لینک تغییر رمز عبور به ایمیل شما ارسال شد.');
          this.$refs.form.reset();
        } else {
          this.$toast.error('ایمیل پیدا نشد.');
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
