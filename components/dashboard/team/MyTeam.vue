<template>
  <div>
    <SectionHeader title="تیم من" icon="mdi-account-group-outline" />
    <img :src="team.image" :alt="team.name" width="500px" />
    <div>
      <div>
        <h1 class="pr-2">
          تیم
          {{ team.name }}
          <v-icon color="blue">mdi-check-decagram</v-icon>
        </h1>
        <h2 class="pr-10">
          اعضای تیم :
        </h2>
        <ul class="pr-14 pa-3">
          <li v-for="(member, index) in team.members" :key="index">{{ member.first_name }} {{ member.last_name }}</li>
        </ul>
      </div>
    </div>
    <div>
      <v-btn block :loading="loading" color="black" width="50vw" class="text-h6" @click="getOutFromTeam()">
        <v-icon color="white" size="30px" class="pl-4 pr-2">mdi-exit-run</v-icon>
        ترک تیم
      </v-btn>
    </div>
  </div>
</template>
<script>
import SectionHeader from '~/components/SectionHeader';

export default {
  props: ['toggleHaveTeam'],
  components: { SectionHeader },
  async fetch() {
    await this.$axios.$get('team').then(res => {
      this.team = res;
    });
  },
  data() {
    return {
      team: {},
      loading: false,
    };
  },
  methods: {
    getOutFromTeam() {
      this.loading = true;
      this.$axios.$delete('team').then(res => {
        console.log(res);
        this.loading = false;
        if (res.status_code === 200) {
          this.$toast.success('شما با موفقیت از تیم خارج شدید!');
          this.toggleHaveTeam();
        } else {
          this.$toast.error('خروج با مشکل مواجه شد!');
        }
      });
    },
  },
};
</script>

<style scoped></style>
