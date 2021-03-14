<template>
  <v-app>
    <div class="searchTable">
      <div class="d-flex justify-space-between align-center pl-6 pl-md-12">
        <SectionHeader title="جستجوی افراد بدون تیم" icon="mdi-account-search-outline" />
        <div class="input-top">
          <v-btn color="secondary" height="50px" class="text-h7" @click="filtertoggle()" :loading="tableLoading">
            <v-icon color="white" size="30px" class="pl-2 pr-2">mdi-filter-variant</v-icon>
            فیلتر ها
          </v-btn>
        </div>
      </div>

      <v-data-table
        :loading="tableLoading"
        hide-default-footer
        center
        :headers="headers"
        :items="data"
        class="elevation-1 table-cursor "
        @click:row="handleClick($event)"
        :page.sync="page"
        :items-per-page="itemPerPage"
        @page-count="pageCount = $event"
        style="background: #141432"
      >
        <template v-slot:[`item.profile.firstname_fa`]="{ item }">
          <div class="pr-6 pr-md-6" v-if="item.profile.image !== null">
            <div class="profile">
              <div>
                <img :src="item.profile.image" :alt="item.email" height="60px" class="ma-2" />
              </div>
              <div>
                <span>{{ item.profile.firstname_fa }} {{ item.profile.lastname_fa }}</span>
              </div>
            </div>
          </div>
          <div v-else class="profile pr-6 pr-md-6">
            <div class="profile">
              <div>
                <v-icon size="80px">
                  mdi-alert-box
                </v-icon>
              </div>
              <div>
                <span>{{ item.profile.firstname_fa }} {{ item.profile.lastname_fa }}</span>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:[`item.profile.university_degree`]="{ item }">{{ universityDegree(item.profile.university_degree) }}</template>
        <template v-slot:[`item.profile.programming_language`]="{ item }">
          {{ programmingLanguage(item.profile.programming_language) }}
        </template>
        <template v-slot:[`item.created`]="{ item }">{{ item.profile.university }}</template>
        <template v-slot:[`item.profile`]="{ item }">
          <v-icon size="30px" dark @click="setCurrentUser(item.profile, item.email, item.id, true)" class="icon-hover">
            mdi-card-account-details-outline
          </v-icon>
        </template>
        <template v-slot:[`item.send`]="{ item }">
          <v-icon @click="sendInvitation(item.email)" size="30px" class="icon-hover ml-5 ml-md-7">mdi-plus-circle</v-icon>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>

      <v-dialog v-model="dialog" width="350">
        <UserProfileForTeam :userData="currentUser" />
      </v-dialog>
      <v-dialog v-model="filter" width="350">
        <v-card>
          <v-container>
            <h2 style="text-align: center;" class="mb-4">
              <v-icon color="primary" size="30px">mdi-filter-variant</v-icon>
              فیلتر ها
            </h2>
            <v-form ref="form">
              <v-text-field v-model="filterData.name" label="نام" outlined height="36px"></v-text-field>
              <v-text-field v-model="filterData.email" label="ایمیل" outlined dir="ltr" height="36px"></v-text-field>
              <v-text-field v-model="filterData.university" label="دانشگاه" outlined dir="ltr" height="36px"></v-text-field>
              <v-text-field v-model="filterData.major" label="رشته" outlined dir="ltr" height="36px"></v-text-field>
              <div class="title">
                <v-checkbox v-model="filterData.programming_language" label="++C" value="cpp"></v-checkbox>
                <v-checkbox v-model="filterData.programming_language" label="Java" value="java"></v-checkbox>
                <v-checkbox v-model="filterData.programming_language" label="Python3" value="python"></v-checkbox>
              </div>
              <div>
                <v-btn width="100%" height="60px" class="text-h6" color="primary" @click="filterSend()" block>
                  اعمال فیلتر
                </v-btn>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import UserProfileForTeam from './UserProfileForTeam';
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';

export default {
  components: { UserProfileForTeam, SectionHeader, SectionContainer },
  async fetch() {
    this.tableLoading = true;
    await this.$axios.$get('accounts/without_team').then(res => {
      if (res.status_code === 200) {
        this.data = res.data;
        this.status_code = res.status_code;
      } else {
        this.$toast.error('خطا در برقراری ارتباط!');
      }
    });
    this.tableLoading = false;
  },
  data() {
    return {
      tableLoading: false,
      dialog: false,
      filter: false,
      page: 1,
      pageCount: 0,
      itemPerPage: 20,
      headers: [
        {
          text: 'نام و نام‌خانوادگی',
          align: 'right',
          sortable: false,
          value: 'profile.firstname_fa',
        },
        { text: 'مقطع تحصیلی', align: 'center', value: 'profile.university_degree' },
        { text: 'زبان برنامه‌نویسی', align: 'center', value: 'profile.programming_language' },
        { text: 'دانشگاه', align: 'center', value: 'profile.university' },
        { text: 'پروفایل', align: 'center', value: 'profile' },
        { text: 'دعوت', align: 'center', value: 'send' },
      ],
      data: [],
      currentUser: {
        profile: {},
        email: '',
        id: 0,
        show: true,
      },
      filterData: {
        name: '',
        email: '',
        university: '',
        major: '',
        programming_language: '',
      },
      status_code: 200,
    };
  },
  methods: {
    sendInvitation(email) {
      this.tableLoading = true;
      let user_email = email;
      this.$axios.$post('team/invitations/team_sent', { user_email }).then(res => {
        if (res.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.message));
        } else {
          this.$toast.error(this.translateResponseMessage(res.message));
        }
      });
      this.tableLoading = false;
    },
    filterSend() {
      this.tableLoading = true;
      var lastApi = 'accounts/without_team';

      for (const property in this.filterData) {
        if (this.filterData[property]) {
          lastApi = lastApi + '?' + property + '=' + this.filterData[property];
        }
      }

      this.$axios.$get(lastApi).then(res => {
        if (res.status_code === 200) {
          this.data = res.data;
          this.status_code = res.status_code;
        } else {
          this.$toast.error('خطا در برقراری ارتباط!');
        }
      });
      this.tableLoading = false;
      this.$refs.form.reset();
      this.filter = !this.filter;
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
    setCurrentUser(profile, email, id, show) {
      this.currentUser.profile = profile;
      this.currentUser.email = email;
      this.currentUser.id = id;
      this.currentUser.show = show;
      this.dialog = true;
    },
    filtertoggle() {
      this.filter = !this.filter;
    },
    translateResponseMessage(response) {
      if (response === 'your invitation sent') return 'دعوت نامه ارسال شد!';
      else if (response === 'you have a sent an invitation already') return 'شما قبلا دعوت نامه ارسال کردید!';
      else return 'مشکلی در ارسال دعوت نامه رخ داد!';
    },
    universityDegree(response) {
      if (response === 'ST') return 'دانش آموز';
      else if (response === 'BA') return 'کارشناسی';
      else if (response === 'MA') return 'کارشناسی ارشد';
      else if (response === 'DO') return 'دکترا';
    },
    programmingLanguage(response) {
      if (response === 'cpp') return 'C++';
      else if (response === 'py3') return 'Python3';
      else if (response === 'java') return 'Java';
    },
  },
};
</script>

<style lang="scss">
.searchTable {
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
    cursor: pointer;
  }
  .title {
    display: flex;
    justify-content: space-between;
  }
  .icon-hover {
    &:hover {
      color: var(--v-primary-base);
    }
  }
  .input-top {
    text-align: left;
  }
  > th {
    padding-right: 100px;
  }
}
</style>
