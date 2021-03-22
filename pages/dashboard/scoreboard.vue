<template>
  <v-app>
    <div class="scoreboard">
      <div class="d-flex justify-space-between align-center pl-6 pl-md-12">
        <SectionHeader title="جدول امتیازات" icon="mdi-scoreboard-outline" />
        <div class="d-flex align-center">
          <v-select
            v-model="scoreboardSelect"
            :items="scoreboardItems"
            item-text="table"
            item-value="src"
            label="تورنومنت"
            persistent-hint
            :hint="`${scoreboardSelect.src}`"
            @change="changeTable"
            outlined
          ></v-select>
        </div>
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
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>
  </v-app>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import axios from '~/plugins/axios';

export default {
  components: { SectionHeader, SectionContainer },
  layout: 'dashboard',
  transition: 'fade-transition',

  // async asyncData({ $axios }) {
  //   const data = await $axios.get('accounts/without_team')
  //   return { data }
  // },
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
      scoreboardSelect: { table: 'تورنومنت ۱', src: '/tour1' },
      scoreboardItems: [
        { table: 'تورنومنت ۱', src: '/tour1' },
        { table: 'تورنومنت ۲', src: '/tour2' },
      ],
      headers: [
        {
          text: 'نام و نام‌خانوادگی',
          align: 'right',
          value: 'profile.firstname_fa',
        },
        { text: 'مقطع تحصیلی', align: 'center', value: 'profile.university_degree' },
        { text: 'زبان برنامه‌نویسی', align: 'center', value: 'profile.programming_language' },
        { text: 'دانشگاه', align: 'center', value: 'profile.university' },
      ],
      data: [],

      status_code: 200,
    };
  },
  methods: {
    changeTable(url) {
      console.log(this.scoreboardTable);
      this.$router.push({ path: '/dashboard/scoreboard/' + url });
      console.log(url);
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
.scoreboard {
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-text-field__details {
    display: none;
  }
}
.v-data-table__empty-wrapper td {
  text-align: center !important;
}
</style>
