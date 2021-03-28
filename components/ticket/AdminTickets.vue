<template>
  <div class="publick-ticket">
    <v-data-table center :headers="headers" :loading="loading" :items="data" class="elevation-1 table-cursor">
      <template v-slot:[`item.status`]="{ item }" class="ma-2">
        <v-icon :color="getColor(item.status)">
          {{ ticketStatusIcon(item.status) }}
        </v-icon>
      </template>
      <template v-slot:[`item.title`]="{ item }">
        <nuxt-link :to="`/dashboard/admin/ticket/${item.id}`" class="title">
          <div>
            {{ item.title }}
          </div>
        </nuxt-link>
      </template>
      <template v-slot:[`item.num_replies`]="{ item }">
        <div style="display: flex; align-items:center;">
          {{ item.num_replies }}
          <v-icon class="mr-2">
            mdi-message-reply-outline
          </v-icon>
        </div>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <div class="ticket-btn-z-index">
          <v-btn @click="closeTicket(item.id)">
            نهایی
          </v-btn>
          <v-btn @click="makePublick(item.id)">
            پابلیک
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['data', 'loading'],

  data() {
    return {
      headers: [
        {
          text: 'وضعیت',
          align: 'center',
          value: 'status',
          width: '12%',
        },
        { text: 'عنوان', align: 'right', value: 'title', width: '68%' },
        { text: '', align: 'center', value: 'num_replies', width: '10%' },
        { text: 'اکشن', align: 'center', value: 'action', width: '10%' },
      ],
      // data: [],
      status_code: 200,
    };
  },
  methods: {
    closeTicket(id) {
      this.$axios.delete(`ai-admin/ticket/${id}`);
      this.$toast.success('close');
    },
    makePublick(id) {
      this.$axios.put(`ai-admin/ticket/${id}`);
      this.$toast.success('close');
    },
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
  },
};
</script>

<style lang="scss">
.publick-ticket {
  text-align: center;
  .title {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
  }
}
.table-cursor tbody tr:hover {
  color: var(--v-secondary-base);
}
</style>
