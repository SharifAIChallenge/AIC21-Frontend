<template>
  <div>
    <div>
      <h1>
        <v-icon color="primary" x-large>
          mdi-script-text-outline
        </v-icon>
        دعوت نامه های من
      </h1>
      <v-alert color="black" dark icon="mdi-information" width="50%" dense>
        ایجا لیست دعوتنامه هایی را که از تیم ها برای عضویت در آن ها دریافت کرده اید، می بینید.
      </v-alert>
      <div v-if="this.pending.length === 0">
        <h1>
          لیست دعوتنامه های شما خالی است
        </h1>
      </div>
      <div v-else>
        <v-row v-for="(request, index) in pending" :key="index">
          <v-col>
            <div class="requestCol">
              <img class="team-Img" :src="request.team.image" height="100" />
              <div class="requsetInfo">
                <h1>{{ request.team.name }}</h1>
                <div class="requestBtn">
                  <v-btn color="black" elevation="2" tile @click="rejectRequest(request.id)">رد کردن</v-btn>
                  <v-btn color="primary" elevation="2" tile @click="acceptRequest(request.id)">
                    <v-icon>mdi-handshake</v-icon>
                    پیوستن به تیم
                  </v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="invitesHistory">
        <div>
          <h1>
            <v-icon color="primary" x-large>mdi-script-outline</v-icon>
            تاریخچه دعوت ها
          </h1>
        </div>
        <v-alert color="black" dark icon="mdi-information" width="50%" dense>
          در این قسمت وضعیت دعوتنامه هایی را که به تیم ها برای عضویت در آن ها فرستاده اید مشاهده میکنید.
        </v-alert>
        <div v-for="(item, index) in reqHistory" :key="index">
          <div>
            <div>
              {{ item.team }}
              <v-icon :color="iconColor(item.status)" size="30px" class="pl-4 pr-2">{{ requestStatusIcon(item.status) }}</v-icon>
              {{ statusMessage(item.status) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async fetch() {
    let res1 = await this.$axios.$get('team/invitations/user_pending');
    let res2 = await this.$axios.$get('team/invitations/user_sent');
    console.log(res1);
    console.log(res2.data);
    this.pending = res1.data;
    this.reqHistory = res2.data;
  },
  data() {
    return {
      pending: [],
      reqHistory: [],
    };
  },
  methods: {
    acceptRequest(id) {
      // console.log('hi');
      this.$axios.$put(`team/invitations/user_pending/${id}?answer=1`).then(res => {
        console.log(res);
      });
    },
    rejectRequest(id) {
      // console.log('hi');
      this.$axios.$put(`team/invitations/user_pending/${id}?answer=0`).then(res => [console.log(res)]);
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
.requestCol {
  display: flex;
  flex-direction: row;
  .requestInfo {
    height: 100%;
    display: flex;
    align-self: flex-end;
  }
}

.requestBtn {
  position: relative;
  bottom: 0px;
}
</style>
