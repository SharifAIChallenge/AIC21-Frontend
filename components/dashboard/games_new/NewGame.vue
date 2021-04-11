<template>
  <div>
    <SectionHeader title="جستجو تیم‌" icon="mdi-magnify" />
    <div class="searchBar px-6 px-md-12">
      <div style="width: 70%">
        <v-text-field
          label="اسم تیم"
          outlined
          dense
          v-model="teamName"
          @keydown.enter="search(teamName)"
          height="50px"
          full-width
        ></v-text-field>
      </div>
      <div style="width: 20%">
        <v-btn block color="primary" :loading="tableLoading" @click="search(teamName)">
          <v-icon class="ml-0 ml-md-3">mdi-magnify</v-icon>
          <div class="hide-sm-and-down">تیم را پیدا کن</div>
        </v-btn>
      </div>
    </div>
    <v-alert dark icon="mdi-information" dense class="mx-6 mx-md-12" v-if="msg">
      <p>{{ msg }}</p>
    </v-alert>
    <div>
      <v-row class="mx-0">
        <v-col cols="6" class="px-0">
          <!-- <v-btn color="primary" block width="100%" max-height="100%" :disabled="!botLevel" @click="playWithBot()">
            <v-icon large class="pl-5">mdi-robot</v-icon>
            درخواست بازی با بات
            <span class="mr-1">
              مرحله
              {{ botLevel }}
            </span>
          </v-btn> -->

          <v-menu offset-y class="transparent">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" block width="100%" max-height="100%" v-bind="attrs" v-on="on">
                <v-icon large class="pl-5">mdi-robot</v-icon>
                درخواست بازی با بات
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in bots" :key="item.number" @click="playWithBot(item.number, item.name)">
                <v-list-item-title style="text-align: center" class="d-flex align-end justify-center">
                  <v-icon class="ml-3" size="30">{{ bot_icon[index] }}</v-icon>
                  <span>{{ item.name }}</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col class="px-0" cols="6">
          <v-btn color="primary" block width="100%" :disabled="!this.randomData || this.randomData.length === 1" @click="randomMatch()">
            <v-icon large class="pl-5">mdi-shuffle-variant</v-icon>
            انتخاب تیم رندوم
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="teams"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        :loading="tableLoading"
      >
        <template v-slot:item.profile="{ item }">
          <v-icon @click="showTeam(item)" class="ProfileIcon">mdi-card-account-details-outline</v-icon>
        </template>
        <template v-slot:item.play="{ item }">
          <div style="max-width: 10px">
            <v-btn color="primary" @click="sendGameRequest(item.id)" block>درخواست بازی</v-btn>
          </div>
        </template>
      </v-data-table>
      <div class="pt-4 pb-10" style="position: relative">
        <v-pagination v-model="page" total-visible="6" :length="pageCount"></v-pagination>
        <!-- <Logo /> -->
      </div>
      <v-dialog v-model="teamDetails" width="350px">
        <v-btn icon class="close-btn" @click="teamDetails = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card>
          <img v-if="teamInfo.image_url" :src="teamInfo.image_url" style="max-width: 100%" />
          <div class="pa-3">
            {{ teamInfo.name }}
          </div>

          <v-row v-for="(member, index) in teamInfo.members" :key="index" class="pa-3" style="width: 100%">
            <v-col cols="2">
              <img :src="member.profile.image_link" :alt="member.first_name" height="40px" style="max-width: 40px" />
            </v-col>
            <v-col cols="10">
              <div class="d-flex align-center">
                <v-col cols="10">
                  {{ member.profile.firstname_fa + ' ' + member.profile.lastname_fa }}
                </v-col>
                <v-col cols="2">
                  <v-icon @click="setCurrentUser(member.profile, member.email, member.id, false)">mdi-card-account-details-outline</v-icon>
                </v-col>
              </div>
            </v-col>
          </v-row>
          <!--          <v-btn color="primary" block class="mt-5" @click="sendRequest(teamInfo.id)" width="100%" height="55px">ارسال درخواست عضویت</v-btn>-->
        </v-card>
      </v-dialog>
      <v-dialog v-model="ProfileDialog" width="350">
        <v-btn icon class="close-btn" @click="ProfileDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <UserProfileForTeam :userData="currentUser" />
      </v-dialog>
    </div>
  </div>
</template>
<script>
import UserProfileForTeam from '~/components/dashboard/team/UserProfileForTeam';
import SectionContainer from '~/components/SectionContainer';
import SectionHeader from '~/components/SectionHeader';
import Logo from '~/components/dashboard/Logo';

export default {
  components: { UserProfileForTeam, SectionHeader, SectionContainer, Logo },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      tableLoading: false,
      teamName: '',
      teamInfo: {},
      ProfileDialog: false,
      teamDetails: false,
      randomData: [],
      teams: [],
      msg: '',
      headers: [
        { text: 'نام تیم', value: 'name' },
        { text: 'پروفایل', value: 'profile' },
        { text: 'بازی دوستانه', value: 'play' },
      ],
      currentUser: {
        profile: {},
        email: '',
        id: 0,
        show: true,
      },
      bots: [],
      bot_icon: ['mdi-baby-face', 'mdi-robot', 'mdi-robber', 'mdi-emoticon-devil', 'mdi-virus'],
    };
  },
  async fetch() {
    this.tableLoading = true;
    let res = await this.$axios.$get('/team/all-teams');
    this.teams = res.results.data;
    const count = 20;
    if (res.count % count === 0) {
      this.pageCount = res.count / count;
    } else {
      this.pageCount = Math.ceil(res.count / count);
    }
    res = await this.$axios.$get('/challenge/lobby');
    if (res.status_code === 403) {
      this.msg = 'برای انجام بازی با تیم تصادفی ابتدا باید در قسمت ارسال کد, کد خود را ارسال کنید';
    }
    this.randomData = res.data;
    this.tableLoading = false;

    res = await this.$axios.$get('/challenge/bot');
    this.bots = res.data;
  },
  watch: {
    page: function () {
      this.changePage(this.page);
    },
  },
  methods: {
    search(name) {
      this.teams = [];
      this.tableLoading = true;
      this.page = 1;
      this.$axios.get(`/team/all-teams?name=${name}`).then(res => {
        const count = 20;
        if (res.data.count % count === 0) {
          this.pageCount = res.data.count / count;
        } else {
          this.pageCount = Math.ceil(res.data.count / count);
        }
        if (res.data.count === 0) {
          this.$toast.error('تیمی با این نام وجود ندارد.');
        }
        this.teams = res.data.results.data;
        this.tableLoading = false;
      });
      // this.teamName = '';
    },
    showTeam(team) {
      this.teamDetails = true;
      this.teamInfo = team;
    },
    playWithBot(level, name) {
      this.$axios
        .post(`challenge/bot/${level}`, {})
        .then(res => {
          this.$toast.success(`بازی با بات ${name} ساخته شد.`);
          this.$toast.success('برای مشاهده نتیجه و جزییات به تب تاریخچه رجوع کنید');
        })
        .catch(err => {
          this.$toast.error('در روند ساخت بازی مشکل ایجاد شده است!');
        });
    },
    changePage(page) {
      this.tableLoading = true;
      this.teams = [];
      if (this.teamName === '') {
        this.$axios.get(`/team/all-teams?page=${page}`).then(res => {
          this.teams = res.data.results.data;
          this.tableLoading = false;
        });
      } else {
        this.$axios.get(`/team/all-teams?name=${this.teamName}&page=${page}`).then(res => {
          this.teams = res.data.results.data;
          this.tableLoading = false;
        });
      }
    },
    setCurrentUser(profile, email, id, show) {
      this.teamDetails = false;
      this.currentUser.profile = profile;
      this.currentUser.email = email;
      this.currentUser.id = id;
      this.currentUser.show = show;
      this.ProfileDialog = true;
    },
    sendGameRequest(teamId) {
      this.$axios.$post('/challenge/request', { type: 'friendly_match', target_team: `${teamId}` }).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('درخواست با موفقیت ارسال شد');
        } else if (res.detail) {
          const detail = res.detail.detail;
          if (detail === 'you have a sent an request already') this.$toast.error('قبلا به این تیم دعوت داده‌اید. منتظر پاسخ بمانید');
          //TODO: check other error
        }
      });
    },
    randomMatch() {
      this.$axios.$post('/challenge/lobby', { game_type: 'friendly_match' }).then(res => {
        if (res.status) {
          this.$toast.success('به لابی بازی‌های دوستانه اضافه شدید');
          this.randomData = [1];
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import 'assets/mixins.scss';
@import 'assets/variables.scss';

.v-list-item:hover {
  background-color: var(--v-shades-lighten4);
}
.searchBar {
  display: flex;
  justify-content: space-between;

  .hide-sm-and-down {
    @include v-not-sm {
      display: none;
    }
  }
}

.ProfileIcon {
  &:hover {
    color: var(--v-primary-base);
  }
}
</style>
