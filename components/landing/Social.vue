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
            <v-btn
              v-for="social in socials"
              :key="social.icon"
              :href="social.url"
              class="mx-4 transparent white--text mx-sm-4"
              target="_blank"
              icon
              large
            >
              <v-icon size="30px">
                {{ social.icon }}
              </v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-expand-x-transition>
    </v-col>
    <div class="mx-4 hidden-sm-and-down"></div>
  </div>
</template>

<script>
export default {
  async fetch() {
    let data = await this.$axios.$get('homepage/socials');
    console.log(data.socials)
    this.socials = data.socials;
  },
  data: () => ({
    expand: false,
    socials:[]
  }),
  methods: {
    openSocial() {
      document.getElementById('menu').classList.toggle('open');
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
  transform: translateX(-50px);
}
.social {
  position: absolute !important;
  // top: -56px;
  top: 0;
  right: -7px;
  border-radius: 0px !important;
}

.vert-text-btn {
  transform: rotate(90deg);
  position: absolute !important;
  top: calc(100vh - 90px);
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
