<template>
  <div class="main">
    <div class="close-btn" @click="toggleShow()">X</div>
    <div class="main-login-form container">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <div class="login-title">
            <v-icon right size="45px" color="wihte">
              mdi-shield-sync-outline
            </v-icon>
            فراموشی رمزعبور
          </div>
          <v-text-field label="ایمیل" outlined dir="ltr" height="36px"></v-text-field>

          <v-row>
            <v-col>
              <v-btn block color="primary" height="50px" style="border-radius: 0; font-weight: normal;">
                ارسال لینک فراموشی رمزعبور
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-btn width="100%" color="#42b3aa" class="sigin-up-btn" height="50px" @click="changeStatus('login')">
      <v-icon style="margin:5px" size="25px">mdi-shield-star</v-icon>
      ورود
    </v-btn>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'empty',
  data() {
    return {};
  },
  methods: {
    toggleShow() {
      this.$store.commit('formStatus/toggleShow');
    },
    changeStatus(form) {
      this.$store.commit('formStatus/changeStatus', form);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #090c18;
  width: 100%;
  height: 100%;
}
.main-login-form {
  margin: 100px auto;
  max-width: 500px;
}
.close-btn {
  position: relative;
  font-size: 50px;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--v-primary-base);
  font-size: 40px;
  font-weight: bold;
}
.sigin-up-btn {
  position: fixed;
  font-size: 20px;
  font-weight: normal;
  bottom: 0;
  border-radius: 0;
}
</style>
