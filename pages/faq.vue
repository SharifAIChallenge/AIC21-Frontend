<template>
  <div>
    <Header color="primary" />
    <div class="first-slider" style="position: relative;">
      <div class="slider-text">
        <div style="margin-top: 20vh;" class="font-weight-bold text-h3 text-sm-h1">
          سوالات متداول
        </div>
        <div style="font-size: 50px;">
          <span class="text-h3 text-sm-h1" style="color: transparent; border: white; -webkit-text-stroke: 2px white;">و</span>
          <span class="font-weight-bold text-h3 text-sm-h1">قوانین</span>
        </div>
        <p class="mt-10 text-h6">
          این مجموعه برای پاسخگویی به سوالات رایج در مورد نبرد هوش مصنوعی شریف
          <br />
          و قوانین آن طراحی شده است
        </p>
      </div>
      <div class="vl"></div>
    </div>
    <div class="faq-titles">
      <div class="title" v-for="(title, index) in titles" :key="index">
        {{ title }}
      </div>
    </div>
    <v-container>
      <div v-for="(subject, index) in faq" :key="index">
        <div class="fag-title-for-show">{{ subject.title }}</div>
        <v-row class="mb-10">
          <v-col v-for="(question, index) in subject.faqs" :key="index" cols="12" sm="6" lg="4" xl="3">
            <div class="faq-card pa-12">
              <div class="faq-card-title">
                <v-icon right color="primary" class="faq-icon" size="55">
                  mdi-calendar
                </v-icon>
                <div>
                  {{ question.question_fa }}
                </div>
              </div>
              <p class="faq-card-text py-8">
                {{ question.answer_fa }}
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <CallToAction />
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';
import { FAQ } from '~/api/index';
import CallToAction from '~/components/CallToAction.vue';

export default {
  auth: false,
  layout: 'landing',
  components: { Header, CallToAction },
  async asyncData({ $axios }) {
    let data = await FAQ($axios);
    const titles = data.data.map(item => item.title);
    let faq = data.data;
    return {
      faq,
      titles,
    };
  },
};
</script>

<style lang="scss">
@import 'assets/variables.scss';
.faq-icon {
  transform: translateX(10px);
}
.first-slider {
  background-color: var(--v-primary-base);
  height: 100vh;
  display: flex;
  align-items: center;
}
.slider-text {
  margin-right: 50px;
  position: absolute;
}
.vl {
  display: block;
  width: 2px;
  height: 30px;
  background-color: white;
  position: absolute;
  bottom: 30px;
  left: 50%;
  animation: ScrollAnimate 2s infinite;
  @keyframes ScrollAnimate {
    0% {
      opacity: 1;
      height: 0;
      bottom: 30px;
    }
    50% {
      opacity: 1;
      height: 50px;
      bottom: 30px;
    }
    100% {
      opacity: 0;
      bottom: 80px;
      height: 0;
    }
  }
}
.faq-titles {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  background-color: map-get($map: $material-dark, $key: 'background');
  z-index: 2;
}
.title {
  margin: auto 50px;
  padding: 20px 0px;
}
.fag-title-for-show {
  font-size: 4rem;
  color: var(--v-primary-base);
  margin-bottom: 40px;
  font-weight: bold;
}

.faq-card {
  border: 3px solid var(--v-primary-base);
  padding: 20px;
  height: 100%;
}
.faq-card-title {
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
