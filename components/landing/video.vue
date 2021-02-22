<template>
  <div
    class="wrapper"
    id="video"
    v-intersect="{
      handler: onIntersecVideo,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <img src="logo__white.svg" class="background-logo" />

    <v-container class="content">
      <v-row>
        <v-col cols="12" md="6">
          <div class="title-video">
            <div>
              <span style="font-size: 1.8rem;">ثبت نام کنید، تیم تشکیل دهید</span>
              <span class="border-text-white">و</span>
            </div>
            <div style="margin: 30px 0px 10px;">
              <span class="text-primary-color">بگذارید</span>
              <span class="border-text-primary">
                کدها
              </span>
              <span class="text-primary-color">بجنگند</span>
            </div>
            <v-row>
              <v-col>
                <v-btn block class="btn" @click="changeStatus('signUp')">
                  {{ $t('home.signUpNow') }}
                </v-btn>
              </v-col>
              <v-col>
                <v-btn block color="black" class="btn" to="/faq">
                  <v-icon style="margin: 10px;">mdi-frequently-asked-questions</v-icon>
                  {{ $t('home.faq') }}
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <video width="80% " controls autoplay class="video">
            <source src="landing.mp4" type="video/mp4" />
          </video>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    changeStatus(form) {
      this.$store.commit('formStatus/changeStatus', form);
    },
  },
  props: {
    onIntersecVideo: Function,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11vmin 0;
  margin: 6vmin 0;
  position: relative;
  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  .content {
    position: relative;
    z-index: 1;
  }
  .video {
    height: 100%;
    width: 100%;
  }
  .background-logo {
    height: 80%;
    right: 0;
    position: absolute;
    opacity: 0.3;
    transform: translateX(50%);
    z-index: 0;
  }
  .btn {
    border-radius: 0;
  }
  .border-text-white {
    color: transparent;
    border: white;
    -webkit-text-stroke: 2px white;
    font-size: 4rem;
  }
  .border-text-primary {
    color: transparent;
    border: white;
    -webkit-text-stroke: 2px var(--v-primary-base);
    font-size: 4rem;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .text-primary-color {
    color: var(--v-primary-base);
    font-size: 3rem;
    font-weight: bold;
  }
}
</style>
