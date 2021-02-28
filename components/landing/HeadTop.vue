<template>
  <div>
    <div id="HeadTop">
      <div class="aiTitle d-flex align-center justify-center">
        <div class="d-flex flex-column align-end justify-center">
          <div class="d-flex align-end" dir="ltr" style="position:relative; width:100%">
            <h2>sharif</h2>
            <h2 class="fight fight-ai">ai</h2>
          </div>
          <div>
            <h2>challenge</h2>
          </div>
          <div><h2 class="fight">2021</h2></div>
        </div>
      </div>
      <span class="scroll"></span>
    </div>
  </div>
</template>

<script></script>

<style scoped lang="scss">
@import '../../assets/mixins.scss';

#HeadTop {
  height: 100vh;
  transition: 0.4s;
  position: relative;
  background-color: #090c18;
  padding-top: 50px;
  @include not-md {
    height: 100vh;
  }
  .aiTitle {
    height: 100%;
    width: 100%;
    h2 {
      text-transform: uppercase;
      font-size: 5rem;
      line-height: 80px;
      @include not-md {
        font-size: 2rem;
        line-height: 30px;
      }
    }
    .fight {
      color: var(--v-primary-base);
      font-size: 10rem;
      line-height: 160px;
      @include not-md {
        font-size: 4rem;
        line-height: 70px;
      }
    }
    .fight-ai {
      position: absolute;
      right: 0;
      bottom: -23px;
      @include not-md {
        bottom: -13px;
      }
    }
  }
  .scroll {
    display: block;
    width: 2px;
    height: 30px;
    background-color: white;
    position: absolute;
    bottom: 200px;
    left: 50%;
    animation: ScrollAnimate 2s infinite;
  }
}
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
</style>
