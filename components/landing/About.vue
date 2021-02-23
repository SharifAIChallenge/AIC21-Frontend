<template>
  <v-container
    id="about"
    v-intersect="{
      handler: onIntersecAbout,
      options: {
        threshold: 0.3,
      },
    }"
  >
    <h1>
      درباره ی
    </h1>
    <h1 class="fight">
      نبرد هوش مصنوعی
    </h1>
    <h1>
      شریف
    </h1>
    <p class="description mt-8 text-right">
      نبرد هوش مصنوعی شریف یک مسابقه تیمی است که در آن تیم ها استراتژی های خود را برای پیروزی در یک نبرد استراتژیک طراحی و در قالب کد پیاده
      سازی میکنند. هر تیم با استفاده از ایده های خلاقانه و استراتژی های متفاوت سعی میکند یک هوش مصنوعی قدرتمنده طراحی کند که تا جای ممکن بر
      تیم های حریف چیره شود و به مرحله حضوری مسابقات راه پیدا کند.
    </p>
  </v-container>
  <!-- <v-responsive class="overflow-y-auto">
    <v-responsive class="d-flex align-center text-center pa-2">
      <v-card 
      id="about"
        v-intersect="{
          handler: onIntersectAbout,
          options: {
            threshold: 0.3,
          },
        }"
        class="mx-auto"
        max-width="336"
      >
        
      </v-card>
    </v-responsive>
  </v-responsive> -->
</template>

<script>
export default {
  props: {
    onIntersecAbout: Function,
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/mixins.scss';
div {
  text-align: center;
}
.fight {
  color: var(--v-primary-base);
  font-size: 4.2rem;
  @include not-md{
    font-size: 3rem;
  }
}
.description {
  text-align: center;
  font-size: 1.2rem;
  padding-top: 8px;
  color: #b2b2b6;
}
#about {
  max-width: 45%;
  padding: 120px 30px;
  @include not-md{
    max-width: 90%;
    padding: 50px 15px;
  }
}
</style>
