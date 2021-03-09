<template>
  <!-- <SendInvitationFromTeam /> -->
  <SearchUsers />

</template>

<script>
import SendInvitationFromTeam from '../components/dashboard/team_new/SendInvitationFromTeam';
import SearchUsers from '../components/dashboard/team_new/SearchUsers';

export default {
  layout: 'landing',
  components: { SendInvitationFromTeam, SearchUsers },
  auth: false,
};
</script>

<style></style>
