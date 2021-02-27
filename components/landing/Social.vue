<template>
  <div>
    <v-col class="shrink">
      <div class="vert-text-btn socialBox" right="-21" color="primary" @click="expand = !expand" v-on:click="openSocial">
        <v-icon :class="{ 'icon-open': expand }" class="icon-wrapper" medium>
          {{ expand ? 'mdi-minus-circle-outline' : 'mdi-plus-circle-outline' }}
        </v-icon>
        ما را دنبال کنید
      </div>

      <v-expand-x-transition>
        <v-card v-show="expand" width="70" class="primary social">
          <div class="social-wrap d-flex flex-column justify-center align-center">
            <v-btn v-for="social in socials" :key="social.icon" :href="social.url" class="mx-4 my-1 ml-2" target="_blank" icon large>
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
    this.socials = data.socials;
  },
  data: () => ({
    expand: false,
    socials: [],
  }),
  methods: {
    openSocial() {
      document.getElementById('menu').classList.toggle('open');
      console.log(process.env.baseURL);
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/mixins.scss';
#main,
#aic-logo-mark {
  transition: 0.4s;
}
.open {
  transform: translateX(-50px);
}
.icon-wrapper {
  transition: transform 0.7s;
}
.icon-open {
  transform: rotate(450deg);
}
.socialBox {
  transform: rotate(90deg);
  position: absolute !important;
  top: calc(100vh - 90px);
  right: -25px;
  z-index: 50;
  cursor: pointer;
  @include not-md {
    top: calc(100vh - 150px);
  }
}
.social {
  position: absolute !important;
  top: 0;
  right: -7px;
  border-radius: 0px !important;
  height: 100vh;
  @include not-md {
    height: calc(100vh - 60px);
  }
}
.social-wrap {
  height: 100vh;
  @include not-md {
    height: calc(100vh - 60px);
  }
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
