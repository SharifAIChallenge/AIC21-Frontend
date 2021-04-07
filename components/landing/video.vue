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
            <div class="d-flex justify-center first-line">
              <span>ثبت نام کنید، تیم تشکیل دهید</span>
              <span class="border-text-white">و</span>
            </div>
            <div style="margin: 30px 0px 10px;" class="second-line d-flex justify-center align-center">
              <span class="text-primary-color">بگذارید</span>
              <span class="font-weight-bold border-text-primary">کدها</span>
              <span class="text-primary-color">بجنگند</span>
            </div>
            <v-row>
              <v-col>
                <!-- <v-btn block class="btn" @click="scrollToCallToAction()">
                  عضویت در خبرنامه
                </v-btn> -->
                <v-btn block class="btn" @click="changeStatus('signUp')" :disabled="true">
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
          <video width="80% " controls class="video">
            <source :src="url" type="video/mp4" />
          </video>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
    };
  },
  async fetch() {
    const res = await this.$axios.$get('/homepage/media');
    this.url = res.data[0].file;
  },
  methods: {
    scrollToCallToAction() {
      const scroll = document.getElementById('CallToAction').getBoundingClientRect().top;
      let scrolltop = document.querySelector('html').scrollTop;
      window.scrollTo({
        top: scroll + scrolltop,
        behavior: 'smooth',
      });
    },
    changeStatus(form) {
      this.$store.commit('formStatus/toggleShow');
      this.$store.commit('formStatus/changeStatus', form);
    },
  },
  props: {
    onIntersecVideo: Function,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/mixins.scss';

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 28vmin 0;
  margin: 30px 0 30px;
  @include not-md {
    padding: 13vmin 0;
  }
  .first-line {
    align-items: flex-end;
    > span:nth-of-type(1) {
      font-size: 2.3rem;
      font-weight: bold;
      @include not-md {
        font-size: 1.3rem;
      }
    }
    > span:nth-of-type(2) {
      font-weight: normal;
      font-size: 5rem;
      @include not-md {
        font-size: 3rem;
      }
    }
  }
  .second-line {
    span {
      font-size: 4.5rem;
      @include not-md {
        font-size: 2.2rem;
      }
      @include lg {
        font-size: 3.2rem;
      }
    }
  }
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
    height: 100vmin;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    opacity: 0.2;
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
  }
  .border-text-primary {
    color: transparent;
    border: white;
    -webkit-text-stroke: 2px var(--v-primary-base);
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
