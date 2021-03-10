<template>
  <div class="d-flex" justify-center>
    <input type="text" v-model="search" />
    <div class="mt-6">
      <v-row v-for="(team, index) in incompleteTeams" :key="index" @click="showTeam=!showTeam">
        <v-col>
          {{ team.name }}
        </v-col>
        <v-col>
          <img :src="team.image" alt="" height="20px" />
        </v-col>
        <div>
        <SendReqUserToTeam v-if="showTeam" :team="team" />
    </div>
      </v-row>
    </div>
    
  </div>
</template>
<script>
import SendReqUserToTeam from '../team_new/SendReqUserToTeam';
export default {
  components: {
    SendReqUserToTeam,
  },
  data() {
    return {
      incompleteTeams: [],
      search: '',
      showTeam: false,
    };
  },
  async fetch() {
    await this.$axios.$get('/team/incomplete').then(res => {
      this.incompleteTeams = res.data;
    });
  },
  computed: {
    filteredTeams: function() {
      return this.incompleteTeams.filter(team => {
        return team.name.match(this.search.ignoreCase);
      });
    },
  },
};
</script>
