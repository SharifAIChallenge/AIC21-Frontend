<template>
  <v-container class="main">
    <img src="logo__white.svg" class="background-logo" />

    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6" xl="6">
        <div class="title">
          <div>
            <span style="font-size: 1.8rem;">ثبت نام کنید، تیم تشکیل دهید</span>
            <span style="color: transparent; border: white; -webkit-text-stroke: 2px white; font-size: 4rem;">و</span>
          </div>
          <div style="margin-top: 30px;  margin-bottom: 10px;">
            <span style="color:var(--v-primary-base); font-size: 3rem; margin-bottom: 10px; font-weight: bold;">بگذارید</span>
            <span style="color: transparent; border: white; -webkit-text-stroke: 2px var(--v-primary-base); font-size: 4rem;">
              کدها
            </span>
            <span style="color:var(--v-primary-base); font-size: 3rem; font-weight: bold;">بجنگند</span>
          </div>
          <v-row>
            <v-col>
              <v-btn block style="border-radius: 0; font-weight: normal; margin: 15px;">
                {{ $t('home.signUpNow') }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block color="black" style="border-radius: 0; font-weight: normal; margin: 15px;">
                <v-icon style="margin: 10px;">mdi-frequently-asked-questions</v-icon>
                {{ $t('home.faq') }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="6">
        <div class="video">
          <video width="80% " controls autoplay>
            <source src="landing.mp4" type="video/mp4" />
          </video>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.title {
  text-align: center;
  margin-bottom: 10px;
}
.video {
  text-align: center;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.background-logo {
  height: 80%;
  right: 0;
  position: absolute;
  opacity: 0.5;
  transform: translateX(50%);
  z-index: 0;
}
</style>
