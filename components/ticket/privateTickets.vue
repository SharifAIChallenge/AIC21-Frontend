<template>
  <div class="main">
    <v-data-table
      hide-default-footer
      center
      :headers="headers"
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
        {{ item.num_replies }}
        <v-icon>
          mdi-message-reply-outline
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$axios.$get('/ticket/').then(res => {
      this.data = res.data;
    });
  },
  props: ['ticketStatus'],
  data() {
    return {
      filterStatus: {
        open: false,
        closed: false,
      },
      headers: [
        {
          text: 'وضعیت',
          align: 'center',
          value: 'status',
          width: '10%',
        },
        { text: 'عنوان', align: 'right', value: 'title', width: '80%' },
        { text: '', align: 'centerx``x', value: 'num_replies', width: '10%' },
        // { text: 'زمان ساخت تیکت', align: 'center', value: 'created' },
        // { text: 'عمومی ؟', align: 'center', value: 'is_public' },
      ],
      data: [],
      status_code: 200,
    };
  },
  methods: {
    toggleOpenStatus() {
      this.filterStatus.open = !this.filterStatus.open;
    },
    toggleClosedStatus() {
      this.filterStatus.closed = !this.filterStatus.closed;
    },
    getColor(status) {
      if (status === 'answered') return 'green';
      else if (status === 'pending') return 'orange';
      else if (status === 'closed') return 'green';
      else if (status === 'open') return 'orange';
      else return 'orange';
    },
    getPublicStatus(is_public) {
      if (is_public === true) return true;
      else if (is_public === false) return false;
    },
    getPublicStatusColor(is_public) {
      if (is_public === true) return 'green';
      else if (is_public === false) return 'red';
    },
    fixDate(created) {
      var str = created;
      return str.substring(0, 10);
    },
    fixTime(created) {
      var str = created;
      return str.substring(11, 19);
    },
    ticketStatusIcon(status) {
      if (status === 'open') return 'mdi-alert-circle-outline';
      else if (status === 'closed') return 'mdi-alert-circle-check-outline';
    },
    handleClick(row) {
      this.$router.push(`/dashboard/ticket/${row.id}`);
    },
    filter(data) {
      console.log(this.ticketStatus);
      if (this.ticketStatus.length === 2 || this.ticketStatus.length === 0) {
        return data;
        console.log('+++++++++++++++++++++');
      } else {
        if (this.ticketStatus[0] === 0) {
          this.data = data.filter(data => data.status === 'closed');
        } else if (this.ticketStatus[0] === 1) {
          this.data = data.filter(data => data.status === 'open');
        }
      }
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
