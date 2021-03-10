<template>
  <v-app>
    <div class="main">
      <div class="title">
        <div>
          <v-icon>
            mdi-account-search-outline
          </v-icon>
          جستجوی افراد بدون تیم
        </div>
        <div>
          <v-btn color="primary" height="60px" class="text-h7">
            <v-icon color="white" size="30px" class="pl-4 pr-2">mdi-script-outline</v-icon>
            ارسال دعوتنامه با ایمیل
          </v-btn>
          <v-btn color="secondary" height="60px" class="text-h7">
            <v-icon color="white" size="30px" class="pl-2 pr-2">mdi-filter-variant</v-icon>
            فیلتر ها
          </v-btn>
        </div>
      </div>

      <v-data-table center :headers="headers" :items="data" class="elevation-1 table-cursor" @click:row="handleClick($event)">
        <template v-slot:[`item.profile.firstname_fa`]="{ item }">
          <div class="profile">
            <img :src="item.profile.image" :alt="item.email" height="80px" class="ma-2" />
            <span>{{ item.profile.firstname_fa }} {{ item.profile.lastname_fa }}</span>
          </div>
        </template>
        <template v-slot:[`item.profile.birth_date`]="{ item }">{{ calculateAge(item.profile.birth_date) }}</template>
        <template v-slot:[`item.created`]="{ item }">{{ item.profile.university }}</template>
        <template v-slot:[`item.profile`]="{ item }">
          <v-dialog v-model="dialog" width="350">
            <div class="close-btn" @click="dialog = false">X</div>
            <template v-slot:activator="{ on, attrs }">
              <v-icon size="30px" dark v-bind="attrs" v-on="on">mdi-card-account-details-outline</v-icon>
            </template>
            <UserProfileFroTeam :userData="item" :userEmail="item.email" :id="item.id" />
          </v-dialog>
        </template>
        <template v-slot:[`item.send`]="{ item }">
          <v-icon @click="sendInvitation(item.email)" size="30px">mdi-plus-circle</v-icon>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>
  </v-app>
</template>

<script>
import UserProfileFroTeam from './UserProfileForTeam';
export default {
  components: { UserProfileFroTeam },
  async fetch() {
    await this.$axios.$get('accounts/without_team').then(res => {
      this.data = res.data;
      this.status_code = res.status_code;
    });
  },
  data() {
    return {
      dialog: false,
      filter: false,
      page: 1,
      pageCount: 0,
      headers: [
        {
          text: 'نام و نام‌خانوادگی',
          align: 'right',
          sortable: false,
          value: 'profile.firstname_fa',
        },
        { text: 'سن', align: 'center', value: 'profile.birth_date' },
        { text: 'دانشگاه', align: 'center', value: 'profile.university' },
        { text: 'پروفایل', align: 'center', value: 'profile' },
        { text: 'دعوت', align: 'center', value: 'send' },
      ],
      data: [
        // {
        //   profile: {
        //     skills: [],
        //     jobs: [],
        //     is_complete: false,
        //     firstname_fa: 'امیر',
        //     firstname_en: 'amir',
        //     lastname_fa: 'قاسمی',
        //     lastname_en: 'zgh',
        //     birth_date: '99',
        //     province: 'تهران',
        //     phone_number: null,
        //     university: 'شریف',
        //     major: 'مهندسی کامپیوتر',
        //     university_term: null,
        //     university_degree: null,
        //     linkedin: '',
        //     github: null,
        //     image: null,
        //     hide_profile_info: false,
        //     resume: null,
        //   },
        //   email: 'user1@user1.com',
        //   id: 4,
        // },
        // {
        //   profile: {
        //     skills: [],
        //     jobs: [],
        //     is_complete: true,
        //     firstname_fa: 'asdf',
        //     firstname_en: 'fa',
        //     lastname_fa: 'adsf',
        //     lastname_en: 'sfs',
        //     birth_date: '2020-08-10',
        //     province: 'sadf',
        //     phone_number: '0123456789',
        //     university: 'asdf',
        //     major: 'dsf',
        //     university_term: 1,
        //     university_degree: 'ST',
        //     linkedin: 'asf',
        //     github: 'fs',
        //     image: 'http://stg.aichallenge.ir/media/1540c612367951.57036a31dc1e3.png',
        //     hide_profile_info: false,
        //     resume: null,
        //   },
        //   email: 'jamshidi.m799@gmail.com',
        //   id: 8,
        // },
      ],
      status_code: 200,
    };
  },
  methods: {
    sendInvitation(email) {
      let user_email = email;
      this.$axios.$post('team/invitations/team_sent', user_email).then(res => {
        if (res.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.message));
        } else {
          this.$toast.error(this.translateResponseMessage(res.message));
        }
      });
    },
    handleClick(row) {
      // this.$router.push(`/ticket/${row.id}`);
    },
    calculateAge(birthday) {
      var dob = new Date(birthday);
      var diff_ms = Date.now() - dob.getTime();
      var age_dt = new Date(diff_ms);
      return Math.abs(age_dt.getUTCFullYear() - 1970);
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
.profile {
  display: flex;
  align-items: center;
}
.close-btn {
  font-size: 20px;
  right: 0px;
}
.title {
  display: flex;
  justify-content: space-between;
}
</style>
