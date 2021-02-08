<template>
  <v-app>
    <div class="main">
      <div class="close-btn">X</div>
      <div class="main-login-form container">
        <v-row justify="center" align="center">
          <v-col>
            <div class="login-title">
              <v-icon right size="55px" color="wihte">
                mdi-shield-star
              </v-icon>
              ورود
            </div>
              <v-text-field label="ایمیل" outlined dir="ltr" height="36px"></v-text-field>
              <v-text-field label="رمزعبور" outlined dir="ltr" height="36px"></v-text-field>
            <v-row>
              <v-col>
                <a href="#">فراموشی رمزعبور</a>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn block color="primary" height="50px" style="border-radius: 0; font-weight: normal;">
                  ورود
                </v-btn>
                <div style="text-align: center; margin:10px;" >
                  ————— یا —————
                </div>
                <v-btn block color="primary" height="50px" style="border-radius: 0; font-weight: normal;">
                  <v-icon style="margin:5px" size="25px">mdi-google</v-icon>
                  ورود با گوگل
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-btn width="100%" color="#42b3aa" class="sigin-up-btn" height="50px">
        <v-icon style="margin:5px" size="25px">mdi-shield-plus-outline</v-icon>
        ثبت نام
      </v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  auth: false,
  layout: 'empty',
};
</script>

<style lang='scss' scoped>
.main {
  background-color: #090c18;
  width: 100%;
  height: 100%;
}
.main-login-form {
  margin: auto;
  max-width: 500px;
}
.close-btn {
  position: relative;
  font-size: 50px;
  right: 15px;
  top: 15px;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--v-primary-base);
  font-size: 55px;
  font-weight: bold;
}
.sigin-up-btn {
  position: fixed;
  font-size: 20px;
  font-weight: normal;
  bottom: 0 ;
  border-radius: 0;
}
</style>
