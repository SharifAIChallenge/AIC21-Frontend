<template>
  <div>
    <div class="timer d-flex justfify-center" v-if="currentTime">
      <div class="d-flex flex-column justify-center align-center">
        <span>{{ ('0' + currentTime.days).slice(-2) }}</span>
        <span>روز</span>
      </div>
      <span>:</span>
      <div class="d-flex flex-column justify-center align-center">
        <span>{{ ('0' + currentTime.hours).slice(-2) }}</span>
        <span>ساعت</span>
      </div>
      <span>:</span>
      <div class="d-flex flex-column justify-center align-center">
        <span>{{ ('0' + currentTime.minutes).slice(-2) }}</span>
        <span>دقیقه</span>
      </div>
      <span>:</span>
      <div class="d-flex flex-column justify-center align-center">
        <span>{{ ('0' + currentTime.seconds).slice(-2) }}</span>
        <span>ثانیه</span>
      </div>
    </div>
    <div v-if="!currentTime">تورنومنت شروع شده!</div>
  </div>
</template>

<script>
export default {
  props: {
    deadline: String,
  },
  data() {
    return {
      currentTime: null,
    };
  },
  mounted() {
    setTimeout(this.countdown, 1);
  },
  methods: {
    countdown() {
      let t = Date.parse(this.deadline) - Date.parse(new Date());
      let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
      if (t > 0) {
        this.currentTime = {
          total: t,
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        };
        setTimeout(this.countdown, 1000);
      } else {
        this.currentTime = null;
      }
    },
  },
};
</script>
<style lang="scss">
.tournaments {
  .timer {
    flex-direction: row-reverse;
    > div span:nth-of-type(1) {
      font-size: 3rem;
      width: 60px;
      height: 60px;
      text-align: center;
    }
    > span {
      font-size: 3rem;
      padding: 0 5px;
    }
  }
}
</style>