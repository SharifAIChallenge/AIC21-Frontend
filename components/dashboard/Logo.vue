<template>
  <div class="dk_logo">
    <img :src="Logo" alt="dk-logo" />
  </div>
</template>

<script>
import Logo from '~/assets/images/logo/dk-logo.png';
export default {
  data() {
    return {
      Logo,
    };
  },
};
</script>
<style lang="scss">
@import '~/assets/mixins.scss';
.dk_logo {
  position: absolute;
  top: 24px;
  right: 86%;
  width: 8%;
  @include v-not-lg {
    right: 88%;
  }
  @include v-not-md {
    right: 20px;
  }
  img {
    width: 100%;
  }
}
.scoreboard .dk_logo {
  right: 60px !important;
  @include v-not-md {
    right: 30px !important;
  }
}
.tickets .dk_logo {
  top: calc(100% - 60px) !important;
  width: 55px !important;
  right: calc(100% - 90px) !important;
}
</style>