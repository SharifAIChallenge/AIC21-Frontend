<template>
  <div>
    <!-- <MyTeam /> -->
    <!-- <CreateTeam /> -->
     <IncompleteTeams />
<!--    <UserInvitation />-->
  </div>
</template>

<script>
import MyTeam from '../components/dashboard/team_new/MyTeam';
import CreateTeam from '../components/dashboard/team_new/CreateTeam';
import IncompleteTeams from '../components/dashboard/team_new/IncompleteTeams';
import UserInvitation from '../components/dashboard/team_new/UserInvitation';

export default {
  layout: 'landing',
  components: { MyTeam, CreateTeam, IncompleteTeams, UserInvitation },
};
</script>

<style></style>
