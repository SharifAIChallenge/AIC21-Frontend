<template>
  <div class="main">
    <v-data-table center :headers="headers" :items="data" class="elevation-1 table-cursor" @click:row="handleClick($event)" >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark>
          {{ fixStatus(item.status) }}
        </v-chip>
      </template>
      <template v-slot:[`item.is_public`]="{ item }">
        <v-icon v-if="getPublicStatus(item.is_public)" :color="getPublicStatusColor(item.is_public)">
          mdi-check-bold
        </v-icon>
        <v-icon v-else :color="getPublicStatusColor(item.is_public)">
          mdi-close-thick
        </v-icon>
      </template>
      <template v-slot:[`item.created`]="{ item }">در تاریخ: {{ fixDate(item.created) }} در ساعت: {{ fixTime(item.created) }}</template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  async fetch() {

    this.$axios.$get('/ticket/publicTickets').then(res => {
      this.data = res.data;
    });
  },
  data() {
    return {
      headers: [
        {
          text: 'موضوع',
          align: 'center',
          sortable: false,
          value: 'title',
        },
        { text: 'وضعیت', align: 'center', value: 'status' },
        { text: 'تعداد جواب ها', align: 'center', value: 'num_replies' },
        { text: 'زمان ساخت تیکت', align: 'center', value: 'created' },
        { text: 'عمومی ؟', align: 'center', value: 'is_public' },
      ],
      data: [],
      status_code: 200,
    };
  },
  methods: {
    getColor(status) {
      if (status === 'answered') return 'green';
      else if (status === 'pending') return 'orange';
      else if (status === 'closed') return 'red';
      else if (status === 'open') return 'green';
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
    fixStatus(status) {
      if (status === 'open') return 'باز';
      else if (status === 'closed') return 'بسته';
    },
    handleClick(row) {
      this.$router.push(`/ticket/${row.id}`)
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
}

</style>
