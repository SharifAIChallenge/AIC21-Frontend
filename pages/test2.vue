<template>
  <!-- <SendInvitationFromTeam /> -->
  <SearchUsersAndSendInvitation />
  <!-- <TeamInvitationAndHistory/> -->
  <!-- <UserInvitation/> -->
</template>

<script>
import SearchUsersAndSendInvitation from '../components/dashboard/team_new/SearchUsersAndSendInvitation';
import TeamInvitationAndHistory from '../components/dashboard/team_new/TeamInvitationAndHistory';
import UserInvitation from '../components/dashboard/team_new/UserInvitation';

export default {
  layout: 'landing',
  components: { SearchUsersAndSendInvitation,TeamInvitationAndHistory,UserInvitation },
  auth: false,
};
</script>

<style></style>
