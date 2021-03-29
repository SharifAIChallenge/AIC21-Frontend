<template>
  <div>
    <SectionHeader title="تاریخچه بازی ها" icon="mdi-history" />

    <!-- <div>
        <div class="select-filter">
          <v-combobox v-model="filterSelect" :items="filteIitems" label="تورنومنت" hide-selected outlined></v-combobox>
          <v-btn height="50" color="primary" class="mr-2" :loading="btnLoading" :disabled="this.filterStatus === this.filterSelect">
            اعمال فیلتر
          </v-btn>
        </div>
      </div> -->
    <div class="px-5 px-md-12">
      <v-chip-group style="display: flex;" @change="handleFilterChip" v-model="filterChip" column active-class="secondary--text secondary">
        <v-chip filter outlined></v-chip>
        <!-- <v-chip filter outlined>
          حل نشده
        </v-chip> -->
      </v-chip-group>
    </div>
    <v-data-table
      :loading="tableLoading"
      hide-default-footer
      center
      :headers="headers"
      :items="data"
      :page.sync="page"
      :items-per-page="itemPerPage"
      @page-count="pageCount = $event"
      style="background: #141432"
    >
      <template v-slot:[`item.x`]="{ item }">
        <!-- <div v-if="item.profile.image">
          <div class="profile">
            <div>
              <img :src="item.profile.image" :alt="item.email" height="60px" class="ml-2 mt-2" />
            </div>
            <div>
              <span>{{ item.profile.firstname_fa }} {{ item.profile.lastname_fa }}</span>
            </div>
          </div>
        </div> -->
        {{ item.team1.name }} - {{ item.team2.name }}
      </template>
      <template v-slot:[`item.winner.name`]="{ item }">
        {{ item.winner ? item.winner.name : '' }}
      </template>
      <template v-slot:[`item.log`]="{ item }">
        <v-btn icon :loading="btnLoading">
          <v-icon size="30px" :disabled="!item.log" class="icon-hover">mdi-download</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>

    <v-dialog v-model="dialog" width="350">
      <v-card>
        <v-container>
          <div class="dialog-header mb-4 mt-4">
            <div>
              <h4>
                دریافت لاگ
              </h4>
            </div>
            <div @click="toggleDialog()" style="cursor: pointer;">
              <h4>
                <v-icon>
                  mdi-close
                </v-icon>
              </h4>
            </div>
          </div>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>لاگ سرور</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn href="https://www.google.com/" target="_blank">
                <v-icon color="primary">mdi-download</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>لاگ گرافیک</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon href="https://www.google.com/" target="_blank">
                <v-icon color="primary">mdi-download</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';

export default {
  components: { SectionHeader, SectionContainer },
  async fetch() {
    this.tableLoading = true;
    await this.$axios.$get('challenge/match').then(res => {
      if (res.status_code === 200) {
        this.data = res.data;
        this.status_code = res.status_code;
      } else if (res.status_code === 403) {
        this.$toast.error('برای مشاهده این صفحه باید تیم داشته باشید');
      } else {
        this.$toast.error('خطا در برقراری ارتباط!');
      }
    });
    this.tableLoading = false;
  },
  data() {
    return {
      filterSelect: 'همه',
      filterStatus: 'همه',
      filteIitems: ['همه', 'دوستانه', 'رقابتی', 'آزمایشی'],
      filterChip: null,
      tableLoading: false,
      btnLoading: false,
      dialog: false,
      page: 1,
      pageCount: 0,
      itemPerPage: 20,
      headers: [
        {
          text: 'بازی',
          align: 'right',
          sortable: false,
          value: 'x',
        },
        // { text: 'زمان', align: 'center', value: '' },
        { text: 'تیم برنده', align: 'center', value: 'winner.name' },
        { text: 'دریافت لاگ', align: 'center', value: 'log' },
      ],
      data: [],
      currentGame: {
        serverLog: '',
        graphicLog: '',
      },
      status_code: 200,
    };
  },
  methods: {
    filter(data) {
      this.tableLoading = true;
      this.btnLoading = true;

      var lastApi = '********************';

      if (data === 'دوستانه') {
        lastApi = lastApi + '?' + '******************' + '=' + '******************';
      } else if (data === 'رقابتی') {
        lastApi = lastApi + '?' + '******************' + '=' + '******************';
      } else if (data === 'آزمایشی') {
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
      this.btnLoading = false;
      this.tableLoading = false;
    },
    handleFilterChip() {
      this.console.log(this.filterChip);
    },
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
    getGameLog(id) {
      this.btnLoading = true;
      this.$axios.$get(`challenge/match/${id}`).then(res => {
        if (res.status_code === 200) {
          this.data = res.data;
          this.dialog = true;
        } else {
          this.$toast.error('خطا در برقراری ارتباط!');
        }
      });
      this.btnLoading = false;
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
.profile {
  display: flex;
  align-items: center;
}

.icon-hover {
  &:hover {
    color: var(--v-primary-base);
  }
}
</style>
