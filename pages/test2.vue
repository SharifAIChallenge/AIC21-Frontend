<template>
  <!-- <SendInvitationFromTeam /> -->
  <SearchUsersAndSendInvitation />

</template>

<script>
import SearchUsersAndSendInvitation from '../components/dashboard/team_new/SearchUsersAndSendInvitation';

export default {
  layout: 'landing',
  components: { SearchUsersAndSendInvitation },
  auth: false,
};
</script>

<style></style>
