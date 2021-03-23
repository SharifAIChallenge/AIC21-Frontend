<template>
  <div>
    <div class='search-box'>
      <div style='width:20%; '>
        <v-icon large color='primary'>
          mdi-magnify
        </v-icon>
        جستجو تیم
      </div>
      <div style='width:80%;'>
        <v-text-field placeholder='نام تیم' outlined></v-text-field>
      </div>
    </div>
    <div>
      <v-row>
        <v-col cols='6' class='px-0'>
          <v-btn color='primary' width='100%' max-height='100%'>
            <v-icon large class='pl-5'>mdi-robot</v-icon>
            درخواست بازی با بات
          </v-btn>
        </v-col>
        <v-col class='px-0' cols='6'>
          <v-btn color='primary' width='100%'>
            <v-icon large class='pl-5'>mdi-shuffle-variant</v-icon>
            انتخاب تیم رندوم
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-data-table
        :headers='headers'
        :items='teams'
        :page.sync='page'
        :items-per-page='itemsPerPage'
        hide-default-footer
        @page-count='pageCount=$event'
      >
        <template v-slot:item.profile='{ item }'>
          <v-icon @click='showTeam()' class='ProfileIcon'>mdi-card-account-details-outline</v-icon>
        </template>
        <template v-slot:item.play='{ item }'>
          <v-btn color='primary'>درخواست بازی</v-btn>
        </template>
      </v-data-table>
      <div>
        <v-pagination v-model='page' :length='pageCount'></v-pagination>
      </div>
      <v-dialog width='350px' v-model='showProfile'>
        <v-card>
          <img src alt='profile'>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      showProfile: false,
      itemsPerPage: 20,
      headers: [
        { text: 'نام تیم', value: 'team' },
        { text: 'پروفایل', value: 'profile' },
        { text: 'بازی دوستانه', value: 'play' },
      ],
      teams: [
        {
          team: 'chelsea',
        },
        {
          team: 'mufc',
        },
        {
          team: 'Barca',
        },
      ],
    };
  },
  methods: {
    showTeam() {
      this.showProfile = true;
    },
  },
};
</script>
<style scoped lang='scss'>
.search-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.ProfileIcon {
  &:hover {
    color: var(--v-primary-base);
  }
}
</style>