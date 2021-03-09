<template>
  <div class="main">
    <v-data-table center :headers="headers" :items="data" class="elevation-1 table-cursor" @click:row="handleClick($event)">
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
    this.$axios.$get('/ticket').then(res => {
      this.data = res.data;
    });
  },
  data() {
    return {
      headers: [
        {
          text: 'نام',
          align: 'right',
          sortable: false,
          value: 'profile.firstname_fa',
        },
        { text: 'سن', align: 'center', value: 'profile.birth_date' },
        { text: 'زبان', align: 'center', value: 'language' },
        { text: 'زمان ساخت تیکت', align: 'center', value: 'created' },
        { text: 'عمومی ؟', align: 'center', value: 'is_public' },
      ],
      data: [
        {
          profile: {
            skills: [],
            jobs: [],
            is_complete: false,
            firstname_fa: 'امیر',
            firstname_en: 'amir',
            lastname_fa: 'قاسمی',
            lastname_en: 'zgh',
            birth_date: '99',
            province: 'تهران',
            phone_number: null,
            university: 'شریف',
            major: 'مهندسی کامپیوتر',
            university_term: null,
            university_degree: null,
            linkedin: '',
            github: null,
            image: null,
            hide_profile_info: false,
            resume: null,
          },
          email: 'user1@user1.com',
          id: 4,
        },
        {
          profile: {
            skills: [],
            jobs: [],
            is_complete: true,
            firstname_fa: 'asdf',
            firstname_en: 'fa',
            lastname_fa: 'adsf',
            lastname_en: 'sfs',
            birth_date: '2020-08-10',
            province: 'sadf',
            phone_number: '0123456789',
            university: 'asdf',
            major: 'dsf',
            university_term: 1,
            university_degree: 'ST',
            linkedin: 'asf',
            github: 'fs',
            image: null,
            hide_profile_info: false,
            resume: null,
          },
          email: 'jamshidi.m799@gmail.com',
          id: 8,
        },
      ],
      status_code: 200,
    };
  },
  methods: {
    handleClick(row) {
      this.$router.push(`/ticket/${row.id}`);
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
