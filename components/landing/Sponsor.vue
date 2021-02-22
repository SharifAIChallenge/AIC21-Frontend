<template>
  <div
    class="mt-2"
    id="sponser"
    v-intersect="{
      handler: onIntersecSponser,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <v-row>
      <v-col md="6" class="white ssc">
        <div class="white sscLogo">
          <img src="~assets/images/logo/ssc-logo.svg" />
        </div>
      </v-col>
      <v-col md="6" align-self="center" class="padding-y">
        <div class="sscIntro">
          <h4>انجمن علمی دانشکده مهندسی کامپیوتر</h4>
          <h3>دانشگاه صنعتی شریف</h3>
          <h2>برگزار میکند</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="digikala padding-y" align-self="center">
        <h1>
          با حمایت
        </h1>
        <h2>
          دیجیکالا
        </h2>
      </v-col>
      <v-col cols="6" class="digikalaLogoCol">
        <div>
          <img src="~assets/images/logo/digikala-logo.svg" class="digikalaLogo" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    onIntersecSponser: Function,
  },
};
</script>

<style lang="scss" scoped>
.padding-y {
  padding: 100px 0px;
}
.digikalaLogoCol {
  background-color: var(--v-primary-base);
  div {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      width: 20vw;
    }
  }
}
.digikala {
  text-align: center;
  h2 {
    padding: 5px;
    color: var(--v-primary-base);
  }
}
.sscIntro {
  text-align: center;
  h4 {
    color: var(--v-primary-base);
  }
  h3 {
    opacity: 0.8;
  }
}
.ssc {
  padding: 0px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      width: 20vw;
      filter: invert(0%) sepia(0%) saturate(7500%) hue-rotate(327deg) brightness(0%) contrast(104%);
    }
  }
}
</style>
