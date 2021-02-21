<template>
  <v-responsive class="overflow-y-auto">
    <v-responsive class="d-flex align-center text-center">
      <v-card
        v-intersect="{
          handler: onIntersectTimeline,
          options: {
            threshold: 0.3,
          },
        }"
      >
        <img src="../../assets/images/logo/logo__white.svg" alt="Ai-challenge" class="timelineLogo d-none d-md-block" width="30%" />
        <div class="col-4 d-flex align-center justify-end timelineTitle my-5">
          <h4 class="mt-5">زمانبندی</h4>
        </div>
        <div>
          <div v-for="(time, index) in timelineArrey" :key="index" class="timelineItem d-flex">
            <div class="col-4 timelineDate d-flex align-end justify-center flex-column">
              <h3>{{ time.day }}</h3>
              <h4 class="text-left ml-md-3">{{ time.month }}</h4>
            </div>
            <div class="timelineDes col-8 d-flex align-start justify-center flex-column">
              <span></span>
              <div>
                <h3 class="d-flex align-center">
                  <v-icon class="ml-3" size="40" medium>mdi-gamepad-variant</v-icon>
                  {{ time.title }}
                </h3>
                <p class="mt-3 text-right pl-3">{{ time.des }}</p>
              </div>
            </div>
          </div>
          <div class="addToCal d-flex">
            <div class="timelineDate col-4"></div>
            <div class="timeLineBtn d-flex flex-column justify-end">
              <span></span>
              <a href="">
                <v-icon medium>mdi-calendar-plus</v-icon>
                به تقویمم اضافه کن
              </a>
            </div>
          </div>
        </div>
      </v-card>
    </v-responsive>
  </v-responsive>
</template>
<script>
export default {
  data() {
    return {
      timelineArrey: [
        { day: '۱۰', month: 'اسفند', title: 'عنوان', des: 'متن نمونه' },
        { day: '۱۲', month: 'اسفند', title: 'عنوان', des: 'متن نمونه' },
        { day: '۱۵ و ۱۶', month: 'اسفند', title: 'عنوان', des: 'متن نمونه' },
        { day: '۲', month: 'فروردین', title: 'عنوان', des: 'متن ن یققلیذیبذ زدلپلاا مکزتذمبا یذمنیم یما مونه' },
      ],
    };
  },
  props: {
    onIntersectTimeline: Function,
  },
};
</script>

<style scoped lang="scss">
.timelineTitle {
  font-size: 7vw;
}
.timelineLogo {
  position: absolute;
  opacity: 0.3;
  left: -15%;
  top: 20%;
}
.timelineItem {
  height: 320px;
  .timelineDate {
    background-color: #ef394e;
    position: relative;
    h3 {
      font-size: 4rem;
      line-height: 80px;
    }
    h4 {
      border-top: 3px solid white;
      font-size: 2rem;
    }
  }
  .timelineDes {
    position: relative;
    padding-right: 48px;
    > div {
      margin-top: 70px;
    }
    span {
      background-color: white;
      width: 2px;
      display: block;
      position: absolute;
      height: 100%;
      right: 24px;
      top: 0;
      &::after {
        display: block;
        content: '';
        width: 24px;
        height: 24px;
        background-color: #42b3aa;
        border: 3px solid #0e1224;
        position: absolute;
        top: 189px;
        left: -10px;
      }
    }
    h3 {
      font-size: 2.3rem;
    }
    p {
      color: gray;
    }
    i {
      color: #ef394e;
    }
  }
}
.addToCal {
  height: 150px;
  .timelineDate {
    background-color: #ef394e;
  }
  .timeLineBtn {
    margin-right: 48px;
    position: relative;
    a {
      margin-bottom: 30px;
      text-decoration: none;
      color: white;
      background-color: #ef394e;
      padding: 5px;
    }
    span {
      background-color: white;
      width: 2px;
      display: block;
      height: 100%;
      position: absolute;
      right: -24px;
      top: 0;
      &::after {
        display: block;
        content: '';
        width: 24px;
        height: 24px;
        background-color: #42b3aa;
        border: 3px solid #0e1224;
        position: absolute;
        top: 100px;
        left: -10px;
      }
    }
  }
}
@media screen and (min-width: 767px) {
  .timelineDate h3 {
    font-size: 9rem !important;
    line-height: 150px !important;
  }
  .timelineTitle {
    font-size: 4.2rem;
  }
  .timeLineBtn {
    margin-right: 96px !important;
    span {
      right: -48px !important;
    }
  }
  .timelineDes {
    padding-right: 96px !important;
    span {
      right: 48px !important;
    }
  }
  .addToCal a {
    padding: 15px 30px !important;
  }
}
</style>
