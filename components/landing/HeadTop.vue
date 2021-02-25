<template>
  <div>
    <div id="HeadTop">
      <span class="scroll"></span>
    </div>
  </div>
</template>

<script></script>

<style scoped lang="scss">
#HeadTop {
  height: calc(100vh - 56px);
  transition: 0.4s;
  position: relative;
  background-color: #090c18;
  .scroll {
    display: block;
    width: 2px;
    height: 30px;
    background-color: white;
    position: absolute;
    bottom: 30px;
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
