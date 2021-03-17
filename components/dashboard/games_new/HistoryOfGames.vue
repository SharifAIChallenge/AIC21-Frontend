<template>
  <div>
    <div class="header">
      <div>
        <h2>
          <v-icon color="primary" size="50">mdi-history</v-icon>
          تاریخچه بازی ها
        </h2>
      </div>
      <div>
        <div class="select-filter">
          <v-combobox v-model="filterSelect" :items="filteIitems" label="تورنومنت" hide-selected outlined></v-combobox>
          <v-btn height="50" color="primary" class="mr-2">اعمال فیلتر</v-btn>
        </div>
      </div>
    </div>

    <v-data-table
      :loading="tableLoading"
      hide-default-footer
      center
      :headers="headers"
      :items="data"
      class="elevation-1 table-cursor"
      @click:row="handleClick($event)"
      :page.sync="page"
      :items-per-page="itemPerPage"
      @page-count="pageCount = $event"
      style="background: #141432"
    >
      <template v-slot:[`item.profile.firstname_fa`]="{ item }">
        <div v-if="item.profile.image">
          <div class="profile">
            <div>
              <img :src="item.profile.image" :alt="item.email" height="60px" class="ml-2 mt-2" />
            </div>
            <div>
              <span>{{ item.profile.firstname_fa }} {{ item.profile.lastname_fa }}</span>
            </div>
          </div>
        </div>
        <div v-else class="profile">
          <div class="profile">
            <div>
              <v-icon size="80px" style="right: -8px">mdi-alert-box</v-icon>
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
      <v-card>
        <v-container>
          <div class="dialog-header">
            <div>
              <h4>
                دریافت لاگ
              </h4>
            </div>
            <div @click="toggleDialog()" style="cursor: pointer;">
              <h4>
                X
              </h4>
            </div>
          </div>
          <v-list-item class="header">
            <v-list-item-content>
              <v-list-item-title>سلام</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.tableLoading = true;
    await this.$axios.$get('***************************').then(res => {
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
      filterSelect: 'همه',
      filteIitems: ['همه', 'دوستانه', 'رقابتی', 'آزمایشی'],
      tableLoading: false,
      dialog: true,
      page: 1,
      pageCount: 0,
      itemPerPage: 20,
      headers: [
        {
          text: 'تیم حریف',
          align: 'right',
          sortable: false,
          value: '',
        },
        { text: 'زمان', align: 'center', value: '' },
        { text: 'نتیجه', align: 'center', value: '' },
        { text: 'دریافت لاگ', align: 'center', value: '' },
      ],
      data: [],
      currentGame: {},
      status_code: 200,
    };
  },
  methods: {
    filter(data) {
      this.tableLoading = true;

      var lastApi = '********************';

      if (data === 'دوستانه') {
        lastApi = lastApi + '?' + '******************' + '=' + '******************';
      } else if (data === '') {
        lastApi = lastApi + '?' + '******************' + '=' + '******************';
      } else if (data === '') {
        lastApi = lastApi + '?' + '******************' + '=' + '******************';
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
    },
    convertDateAndTime() {},
    resultTrasnlate(res) {
      if (res === '') return 'برد';
      else if (res === '') return 'باخت';
      else if (res === '') return 'مساوی';
      else if (res === '') return 'در حال اجرا';
    },
    resultIcon(res) {
      if (res === '') return 'mdi-emoticon-cool-outline';
      else if (res === '') return 'mdi-emoticon-cry-outline';
      else if (res === '') return 'mdi-emoticon-happy-outline';
      else if (res === '') return 'mdi-progress-clock';
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
.select-filter {
  display: flex;
  
}
.dialog-header {
  display: flex;
  justify-content: space-between;
}
</style>
