<template>
  <div class="main">
    <v-data-table
      center
      :headers="headers"
      :loading="loadingTable"
      :items="data"
      class="elevation-1 table-cursor"
      @click:row="handleClick($event)"
    >
      <template v-slot:[`item.status`]="{ item }" class="ma-2">
        <v-icon :color="getColor(item.status)">
          {{ ticketStatusIcon(item.status) }}
        </v-icon>
      </template>
      <template v-slot:[`item.title`]="{ item }">
        {{ item.title }}
      </template>
      <template v-slot:[`item.num_replies`]="{ item }">
        <div style="display: flex; align-items:center;">
          {{ item.num_replies }}
          <v-icon class="mr-2">
            mdi-message-reply-outline
          </v-icon>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  // async fetch() {
  //   this.loadingTable = true;
  //   await this.$axios.$get('/ticket/publicTickets').then(res => {
  //     if (res.status_code === 200) {
  //       this.data = res.data;
  //     } else {
  //       this.$toast.error('مشکلی در لود دیتا به وجود آمده است!');
  //     }
  //   });
  //   this.loadingTable = false;
  // },
  props: ['data'],

  data() {
    return {
      loadingTable: false,
      headers: [
        {
          text: 'وضعیت',
          align: 'center',
          value: 'status',
          width: '12%',
        },
        { text: 'عنوان', align: 'right', value: 'title', width: '78%' },
        { text: '', align: 'center', value: 'num_replies', width: '10%' },
      ],
      // data: [],
      status_code: 200,
    };
  },
  methods: {
    getColor(status) {
      if (status === 'answered') return 'green';
      else if (status === 'pending') return 'orange';
      else if (status === 'closed') return 'green';
      else if (status === 'open') return 'orange';
      else return 'orange';
    },
    ticketStatusIcon(status) {
      if (status === 'open') return 'mdi-alert-circle-outline';
      else if (status === 'closed') return 'mdi-alert-circle-check-outline';
    },
    handleClick(row) {
      this.$router.push(`/dashboard/ticket/${row.id}`);
    },
  },
};
</script>

<style>
.main {
  text-align: center;
}
.table-cursor tbody tr:hover {
  cursor: pointer;
  color: var(--v-secondary-base);
}
</style>
