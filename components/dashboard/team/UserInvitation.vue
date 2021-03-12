<template>
  <div>
    <SectionHeader title="دعوت نامه های من" icon="mdi-script-text-outline" />
    <SectionContainer>
      <v-alert icon="mdi-information" class="mb-8">
        ایجا لیست دعوتنامه هایی را که از تیم ها برای عضویت در آن ها دریافت کرده اید، می بینید.
      </v-alert>
      <div v-if="this.pending.length === 0" class="mb-10">
        لیست دعوتنامه های شما خالی است
      </div>
      <div v-else class="mb-10">
        <v-row v-for="(request, index) in pending" :key="index">
          <v-col cols="3">
            <div class="d-flex align-end" style="height: 100%">
              <img :src="request.team.image" class="teamImg" />
            </div>
          </v-col>
          <v-col class="reqInfoAndButtons" cols="9">
            <div class="d-flex align-center mr-5" style="height: 100%">
              <h1>{{ request.team.name }}</h1>
            </div>
            <div class="buttons mr-5">
              <div>
                <v-btn color="black" block @click="rejectRequest(request.id)" :loading="loading">رد کردن</v-btn>
              </div>
              <div>
                <v-btn color="primary mr-5" block @click="acceptRequest(request.id)" :loading="loading">
                  <v-icon class="ml-3">mdi-handshake</v-icon>
                  پیوستن به تیم
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="invitesHistory">
        <div class="mb-10">
          <h1>
            <v-icon color="primary" x-large>mdi-script-outline</v-icon>
            تاریخچه دعوت ها
          </h1>
        </div>
        <v-alert icon="mdi-information" class="mb-8">
          در این قسمت وضعیت دعوتنامه هایی را که به تیم ها برای عضویت در آن ها فرستاده اید مشاهده میکنید.
        </v-alert>
        <div v-for="(item, index) in reqHistory" :key="index" class="pb-4">
          <div class="history">
            <div class="d-flex flex-row">
              {{ item.team.name }}
            </div>
            <div
              v-bind:class="{
                blueFont: item.status === 'pending',
                orangeFont: item.status === 'rejected',
                greenFont: item.status === 'accepted',
              }"
            >
              <v-icon
                v-bind:class="{
                  blueFont: item.status === 'pending',
                  orangeFont: item.status === 'rejected',
                  greenFont: item.status === 'accepted',
                }"
                size="30px"
                class="pl-4 "
              >
                {{ requestStatusIcon(item.status) }}
              </v-icon>
              {{ statusMessage(item.status) }}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  </div>
</template>
<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';

export default {
  components: { SectionHeader, SectionContainer },
  props: ['toggleHaveTeam'],

  async fetch() {
    let res1 = await this.$axios.$get('team/invitations/user_pending');
    let res2 = await this.$axios.$get('team/invitations/user_sent');
    this.pending = res1.data;
    this.reqHistory = res2.data;
  },
  data() {
    return {
      loading: false,
      pending: [],
      reqHistory: [],
    };
  },
  methods: {
    acceptRequest(id) {
      this.loading = true;
      this.$axios.$put(`team/invitations/user_pending/${id}?answer=1`).then(res => {
        console.log(res);
        if (res.status_code === 200) {
          this.$toast.success('دعوت با موفقیت پذیرفته شد.');
          this.toggleHaveTeam();
        } else {
          this.$toast.error('مشکلی در قبول درخواست رخ داد لطفا دوباره امتحان کنید.');
        }
      });
      this.loading = false;
    },
    rejectRequest(id) {
      this.loading = true;
      this.$axios.$put(`team/invitations/user_pending/${id}?answer=0`).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('دعوت با موفقیت رد شد.');
          this.toggleHaveTeam();
        } else {
          this.$toast.error('مشکلی در رد کردن درخواست رخ داد لطفا دوباره امتحان کنید.');
        }
      });
      this.loading = false;
    },
    requestStatusIcon(status) {
      if (status === 'pending') return 'mdi-progress-question';
      else if (status === 'accepted') return 'mdi-progress-check';
      else if (status === 'rejected') return 'mdi-progress-close';
    },
    iconColor(status) {
      if (status === 'pending') return 'blue';
      else if (status === 'accepted') return 'green';
      else if (status === 'rejected') return 'orange';
    },
    statusMessage(status) {
      if (status === 'pending') return 'در انتظار پاسخ';
      else if (status === 'accepted') return 'قبول کرد';
      else if (status === 'rejected') return 'رد کرد';
    },
  },
};
</script>
<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: row;
}

.teamImg {
  max-width: 100%;
}
.reqInfoAndButtons {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.blueFont {
  color: rgb(41, 37, 255);
}

.orangeFont {
  color: orange;
}

.greenFont {
  color: green;
}
.history {
  display: flex;
  justify-content: space-between;
}
</style>
