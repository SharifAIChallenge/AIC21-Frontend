<template>
  <div>
    <v-col class="shrink">
      <div class="vert-text-btn" bottom="50" right="-21" color="primary" @click="expand = !expand" v-on:click="openSocial">
        <v-icon medium>mdi-plus</v-icon>
        ما را دنبال کنید
      </div>

      <v-expand-x-transition>
        <v-card v-show="expand" height="100vh" width="70" class="primary social">
          <div class="social-wrap d-flex flex-column justify-center align-center">
            <a href="instagram.com" class="my-2">
              <v-icon medium>mdi-instagram</v-icon>
            </a>
            <a href="instagram.com" class="my-2">
              <v-icon medium>mdi-linkedin</v-icon>
            </a>
            <a href="instagram.com" class="my-2">
              <v-icon medium>mdi-instagram</v-icon>
            </a>
            <a href="instagram.com" class="my-2">
              <v-icon medium>mdi-linkedin</v-icon>
            </a>
          </div>
        </v-card>
      </v-expand-x-transition>
    </v-col>
    <div class="mx-4 hidden-sm-and-down"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    expand: false,
  }),
  methods: {
    openSocial() {
      document.getElementById('main').classList.toggle('open');
      document.getElementById('aic-logo-mark').classList.toggle('open2');
    },
  },
};
</script>

<style lang="scss">
#main,
#aic-logo-mark {
  transition: 0.4s;
}
.open {
  transform: translateX(-70px);
}
.open2 {
  transform: translateX(70px);
}
.social {
  position: fixed !important;
  top: 0;
  right: -7px;
  border-radius: 0px !important;
}

.vert-text-btn {
  transform: rotate(90deg);
  position: fixed !important;
  bottom: 60px;
  right: -25px;
  z-index: 50;
  cursor: pointer;
}
.social-wrap {
  height: 100vh;
  a {
    text-decoration: none;
    i {
      &:hover {
        color: black;
      }
    }
  }
}
</style>
