<template>
  <div>
    <Header class="pb-4" />
    <v-container style="margin-top: 100px; margin-bottom: 200px">
      <div class="sponsor-header">
        <div class="name">
          <h1>
            {{ data.title_fa }}
          </h1>
        </div>
        <div class="sponsor-social">
          <div dir="ltr">
            <v-icon>mdi-web</v-icon>
            <a :href="data.url" class="link" target="_blank">
              {{ data.url }}
            </a>
          </div>
          <div>
            <v-btn icon v-for="(social, index) in data.socials" :key="index" :href="social.url" target="_blank">
              <v-icon>{{ social.icon }}</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <hr />

      <div class="info-main mt-16">
        <div class="text">
          <span>
            {{ data.description }}
          </span>
        </div>
        <div class="mt-8" v-if="data.video !== null">
          <video width="90%" controls class="video">
            <source :src="data.video" type="video/mp4" />
          </video>
        </div>
      </div>
      <div class="job-offer mt-16" v-if="data.jobs && data.jobs.length">
        <div class="mb-6">
          <h2>
            فرصت های شغلی
          </h2>
        </div>
        <div class="job-card ">
          <!-- <v-row class="mb-10">
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
          </v-row> -->
          <v-chip v-for="(job, index) in data.jobs" :key="index" :href="job.job_url" target="_blank" class="ma-4">{{ job.title }}</v-chip>
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
  async asyncData({ route, $axios }) {
    var slug = route.params.slug;
    let res = await $axios.$get(`/homepage/sponsors/${slug}`);
    const { data, status_code } = res;
    console.log(res);
    return { data, status_code };
  },
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
.sponsor-header {
  display: flex;
  justify-content: space-between;
}
.sponsor-social {
  direction: ltr;
}
.info-main {
  max-width: 900px;
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
.link {
  color: white;
}
.link:hover {
  color: var(--v-primary-base);
}
</style>
