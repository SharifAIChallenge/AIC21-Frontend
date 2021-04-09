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
        <div class="sscLogo">
          <a href="https://ssc.ce.sharif.edu" target="_blank" class="d-flex justify-center" style="width: 100%; height: 100%">
            <img src="~assets/images/logo/ssc-logo.svg" />
          </a>
        </div>
      </v-col>
      <v-col md="6" align-self="center" class="padding-y">
        <div class="sscIntro">
          <h4>انجمن علمی دانشکده مهندسی کامپیوتر</h4>
          <h3>دانشگاه صنعتی شریف</h3>
          <h2>برگزار می‌کند</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="digikala padding-y" align-self="center">
        <h2>با حمایت</h2>
        <h1 style="font-size: 3.5rem" class="mt-3">
          <nuxt-link to="/sponsors/digikala">دیجیکالا</nuxt-link>
        </h1>
      </v-col>
      <v-col cols="6" class="digikalaLogoCol">
        <nuxt-link to="/sponsors/digikala">
          <div>
            <img src="~assets/images/logo/digikala-logo.svg" class="digikalaLogo" />
          </div>
        </nuxt-link>
      </v-col>
    </v-row>
    <div style="text-align: center" class="mt-10">
      <h3>حامی رسانه‌ای</h3>
      <nuxt-link to="/sponsors/aparat">
        <h1 class="mt-3" style="font-size: 2.2rem">آپارات</h1>
      </nuxt-link>
    </div>
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
$image-width: 30vmin;
.padding-y {
  padding: 20vmin 0px;
}

.sscLogo {
  transition: all 0.6s;
  &:hover {
    background-color: var(--v-secondary-base);
  }
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
      width: $image-width;
    }
  }
  transition: all 0.6s;
  &:hover {
    background-color: var(--v-secondary-base);
    transition: all 0.6s;
  }
}

.digikala {
  text-align: center;

  // h2 {
  //   padding: 5px;
  //   color: var(--v-primary-base);
  // }
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
      width: $image-width;
      filter: invert(0%) sepia(0%) saturate(7500%) hue-rotate(327deg) brightness(0%) contrast(104%);
    }
  }
}
</style>
