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
      <v-chip-group style="display: flex" @change="handleFilterChip" v-model="filterChip" column active-class="secondary--text secondary">
        <v-chip filter outlined>تمام شده</v-chip>
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
      <template v-slot:[`item.status`]="{ item }">
        {{ gameStatus(item.status) }}
      </template>
      <template v-slot:[`item.winner.name`]="{ item }">
        {{ item.winner ? item.winner.name : '' }}
      </template>
      <template v-slot:[`item.log`]="{ item }">
        <v-btn icon :loading="btnLoading" :ripple="false" :disabled="item.status !== 'successful'" :href="item.log">
          <v-icon size="30px" class="icon-hover">mdi-download</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.serverLog`]="{ item }">
        <v-btn icon :loading="btnLoading" :ripple="false" :disabled="item.status !== 'successful'" :href="item.server_log">
          <v-icon size="30px" class="icon-hover">mdi-download</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-4 pb-10" style="position: relative">
      <v-pagination v-model="page" :length="pageCount" total-visible="5" class="my-3" />
      <Logo />
    </div>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import Logo from '~/components/dashboard/Logo';

export default {
  components: { SectionHeader, SectionContainer, Logo },
  async fetch() {
    this.tableLoading = true;
    let filter = this.filterChip === 0 ? '&status=successful' : '';
    await this.$axios.$get(`challenge/match?page=${this.page}${filter}`).then(res => {
      if (res.status_code === 200) {
        this.data = res.results.data;
        this.pageCount = res.count;
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
        { text: 'وضعیت بازی', align: 'center', value: 'status' },
        { text: 'تیم برنده', align: 'center', value: 'winner.name' },
        { text: 'لاگ', align: 'center', value: 'log' },
        { text: 'لاگ سرور', align: 'center', value: 'serverLog' },
      ],
      data: [],
      currentGame: {
        serverLog: '',
        graphicLog: '',
      },
      status_code: 200,
      item: null,
    };
  },
  watch: {
    page() {
      this.$fetch();
    },
  },
  methods: {
    gameStatus(status) {
      switch (status) {
        case 'freeze':
          return 'ثبت شده';
        case 'pending':
          return 'در صف اجرا';
        case 'running':
          return 'در حال اجرا';
        case 'failed':
          return 'اجرا با خطا';
        case 'successful':
          return 'تمام ‌شده';
      }
    },
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
      this.$fetch();
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
