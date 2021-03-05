<template>
  <div>
  <!-- <MyTeam /> -->
<CreateTeam />
  </div>
</template>

<script>
import MyTeam from '../components/dashboard/team_new/MyTeam';
import CreateTeam from '../components/dashboard/team_new/CreateTeam'

export default {
  layout: 'landing',
  components: { MyTeam ,CreateTeam },
  auth: false,
};
</script>

<style></style>
