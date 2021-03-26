<template>
  <v-responsive class="overflow-y-auto">
    <v-responsive class="d-flex align-center text-center">
      <v-card
        id="timeline"
        v-intersect="{
          handler: onIntersecTimeline,
        }"
      >
        <img src="../../assets/images/logo/logo__white.svg" alt="Ai-challenge" class="timelineLogo d-none d-md-block" width="30%" />
        <div class="col-4 d-flex align-center justify-end timelineTitle my-5">
          <h4 class="mt-5">زمان‌بندی</h4>
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
            <div class="timeLineBtn">
              <span></span>
              <v-btn block :href="calendarLink" target="blank">
                <v-icon medium class="ml-2">mdi-calendar-plus</v-icon>
                به تقویمم اضافه کن
              </v-btn>
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
      timelineArrey: [],
      calendarLink: '',
    };
  },
  async fetch() {
    const res = await this.$axios.$get('homepage/timeline');
    this.calendarLink = res.calendar;
    this.timelineArrey = res.data.map(item => {
      return { title: item.title_fa, des: item.text_fa, day: item.day, month: item.month };
    });
  },
  props: {
    onIntersecTimeline: Function,
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/mixins.scss';

#timeline {
  background-color: #0e1224;
  position: relative;
}
.timelineTitle {
  font-size: 4.2rem;
  @include not-md {
    font-size: 7vw;
  }
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
      font-size: 9rem;
      line-height: 150px;
      text-align: left;
      @include not-xl {
        font-size: 7rem;
      }
      @include not-lg {
        font-size: 5rem;
      }
      @include not-md {
        font-size: 4rem;
        line-height: 80px;
      }
    }
    h4 {
      border-top: 3px solid white;
      font-size: 2rem;
    }
  }
  .timelineDes {
    position: relative;
    padding-right: 96px;
    @include not-md {
      padding-right: 48px !important;
      span {
        right: 24px !important;
      }
    }
    > div {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    span {
      background-color: white;
      width: 2px;
      display: block;
      position: absolute;
      height: 100%;
      right: 48px;
      top: 0;
      &::after {
        display: block;
        content: '';
        width: 24px;
        height: 24px;
        background-color: #42b3aa;
        border: 3px solid #0e1224;
        position: absolute;
        top: 50%;
        transform: translateY(-12px);
        left: -10px;
      }
    }
    h3 {
      font-size: 2.3rem;
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
    margin-right: 96px;
    position: relative;
    display: flex;
    align-items: center;
    @include not-md {
      margin-right: 48px;
    }
    button {
      border-radius: 0;
      padding: 0 45px;
      @include not-md {
        padding: 0;
      }
    }
    span {
      background-color: white;
      width: 2px;
      display: block;
      height: 100%;
      position: absolute;
      right: -48px;
      top: 0;
      @include not-md {
        right: -24px;
      }
      &::after {
        display: block;
        content: '';
        width: 24px;
        height: 24px;
        background-color: #42b3aa;
        border: 3px solid #0e1224;
        position: absolute;
        top: 50%;
        transform: translateY(-12px);
        left: -10px;
      }
    }
  }
}
</style>
