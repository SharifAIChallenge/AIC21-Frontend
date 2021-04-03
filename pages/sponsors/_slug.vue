<template>
  <div>
    <Header class="pb-4" />
    <v-container class="pt-16 ">
      <div class="header">
        <div class="name">
          <h1>
            دیجیکالا
          </h1>
        </div>
        <div class="social">
          <div dir="ltr">
            <v-icon>mdi-web</v-icon>
            Digikala.com
          </div>
          <div>
            <v-btn icon>
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <hr />

      <div class="info-main mt-16">
        <div class="text">
          <span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam error ducimus tenetur, quisquam ex debitis inventore,
            perspiciatis nobis ad minus sit, deleniti cupiditate eaque assumenda doloremque facere quasi sapiente tempora! Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Distinctio aliquid voluptate dolore temporibus corrupti dignissimos, iste libero
            officiis est! Voluptates quis ex corrupti commodi magnam animi voluptas, eaque perferendis quae Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Suscipit distinctio quam quae repudiandae, cupiditate eum aliquid, cumque eveniet recusandae
            tenetur perspiciatis aperiam corrupti quos reprehenderit itaque laborum esse, totam laudantium!Lorem Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Aliquam sed iusto ipsum sint? Architecto, eligendi at eaque sequi consequuntur quas ipsum odit
            consectetur dolores doloremque animi maiores explicabo sit accusantium!
          </span>
        </div>
        <div class="mt-8">
          <video width="80%" controls class="video">
            <source src="landing.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div class="job-offer mt-8">
        <div class=" mb-4">
          <h2>
            فرصت های شغلی
          </h2>
        </div>
        <div class="job-card pr-8">
          <v-row class="mb-10">
            <v-col cols="12" sm="6" lg="4" xl="3">
              <div class="faq-card pa-12">
                <div class="faq-card-title">
                  عنوان شغلی
                </div>
                <p class="faq-card-text py-8">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem nemo nisi qui libero quasi repellendus natus hic. Unde
                  ipsam tempore est, voluptatibus sequi fugiat iusto enim a numquam quidem delectus.
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import Header from '~/components/landing/Header.vue';

export default {
  layout: 'landing',
  components: { Header },

  // async asyncData({ route, $axios }) {
  //   var slug = route.params.slug;
  //   let res = await $axios.$get(`************/${slug}`);
  //   const { data, status_code } = res;
  //   return { data, status_code };
  // },
  data() {
    return {
      data: {},
      status_code: 200,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
.social {
  direction: ltr;
}
.info-main {
  max-width: 70%;
  margin: auto;
  text-align: center;
}
.faq-card {
  border: 3px solid var(--v-primary-base);
  padding: 20px;
  height: 100%;
}
.faq-card-title {
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
