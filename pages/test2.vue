<template>
  <SendInvitationFromTeam />
</template>

<script>
import SendInvitationFromTeam from '../components/dashboard/team_new/SendInvitationFromTeam';

export default {
  layout: 'landing',
  components: { SendInvitationFromTeam },
  auth: false,
};
</script>

<style></style>
