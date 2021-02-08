<template>
  <div class="main">
    <div class="close-btn" @click="toggleShow()">X</div>
    <div class="main-sign-up-form container">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <div class="sign-up-title">
            <v-icon right size="55px" color="wihte">
              mdi-shield-plus-outline
            </v-icon>
            ثبت نام
          </div>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-text-field label="نام به فارسی" outlined height="36px" style="margin: 10px;"></v-text-field>
            <v-text-field label="نام خانوادگی به فارسی" outlined height="36px" style="margin: 10px;"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="نام به انگلیسی" outlined dir="ltr" height="36px" style="margin: 10px;"></v-text-field>
            <v-text-field label="نام خانوادگی به انگلیسی" outlined dir="ltr" height="36px" style="margin: 10px;"></v-text-field>
          </v-row>

          <v-text-field label="ایمیل" outlined dir="ltr" height="36px"></v-text-field>

          <v-text-field
            label="رمزعبور"
            outlined
            dir="ltr"
            height="36px"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-btn block color="primary" height="50px" style="border-radius: 0; font-weight: normal;">
                ثبت نام
              </v-btn>
              <div style="text-align: center; margin:10px;">
                ————— یا —————
              </div>
              <v-btn block color="primary" height="50px" style="border-radius: 0; font-weight: normal;">
                <v-icon style="margin:5px" size="25px">mdi-google</v-icon>
                ثبت نام با گوگل
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-btn width="100%" color="#42b3aa" class="login-btn" height="50px" @click="changeStatus('login')">
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
    return {
      showPassword: false,
    };
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

<style>
.main {
  background-color: #090c18;
  width: 100%;
  height: 100%;
}
.main-sign-up-form {
  margin: auto;
  margin-bottom: 150px;
  max-width: 700px;
}
.close-btn {
  position: relative;
  font-size: 50px;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.sign-up-title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--v-primary-base);
  font-size: 55px;
  font-weight: bold;
}
.login-btn {
  position: fixed;
  font-size: 25px !important;
  font-weight: normal;
  bottom: 0;
  border-radius: 0;
}
</style>
