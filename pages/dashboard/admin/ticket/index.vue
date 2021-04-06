<template>
  <div>
    <AdminTickets :data="tickets" :loading="loading" />
  </div>
</template>

<script>
import AdminTickets from '~/components/ticket/AdminTickets';
export default {
  layout: 'admin',
  components: { AdminTickets },
  data() {
    return {
      loading: false,
      tickets: [],
    };
  },
  async fetch() {
    this.loading = true;
    let res = await this.$axios.$get('ai-admin/ticket');
    this.tickets = res.data.sort((a, b) => new Date(a.created) - new Date(b.created)).reverse();
    this.loading = false;
  },
};
</script>

<style></style>
