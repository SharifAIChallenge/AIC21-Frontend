<template>
  <div>
    <h1>
      <v-icon color="primary" size="40px" class="pl-2 pr-2">mdi-account-group-outline</v-icon>
      تیم من
    </h1>
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
      <v-btn width="50vw" height="60px" class="text-h6" @click="getOutFromTeam()">
        <v-icon color="white" size="30px" class="pl-4 pr-2">mdi-exit-run</v-icon>
        ترک تیم
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  auth: false,
  async fetch() {
    await this.$axios.$get('team').then(res => {
      this.team = res;
    });
  },
  data() {
    return {
      team: {
        // name: 'amir',
        // image: 'http://api-stg.aichallenge.ir/media/teams/images/2018.jpg',
        // members: [
        //   {
        //     first_name: 'hesam',
        //     last_name: 'asna',
        //     email: 'a@b.com',
        //   },
        // ],
        // creator: {
        //   first_name: 'hesam',
        //   last_name: 'asna',
        //   email: 'a@b.com',
        // },
        // status_code: 200,
      },
    };
  },
  methods: {
    getOutFromTeam() {
      this.$axios.$delete('team').then(res => {
        console.log(res);
        if (res.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.message));
          this.team = {};
        } else {
          this.$toast.error(this.translateResponseMessage(res.message));
        }
      });
    },
    translateResponseMessage(res) {
      if (res === 'You left the team') {
        return 'شما با موفقیت از تیم خارج شدید!';
      } else {
        return 'خروج با مشکل مواجه شد!';
      }
    },
  },
};
</script>

<style></style>
