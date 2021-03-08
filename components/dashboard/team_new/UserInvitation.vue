<template>
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
    <div v-if="this.pending.length===0">
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
      <v-row v-for="(item, index) in reqHistory" :key="index">
        <v-col>
          <!-- <div class="requestCol">
            <img :src=item. alt="">
          </div> -->
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pending: [],
      reqHistory: [],
    };
  },
  methods: {
    acceptRequest(id) {
      console.log('hi');
      this.$axios.$put(`team/invitations/user_pending/${id}?answer=1`).then(res => {
        console.log(res);
      });
    },
    rejectRequest(id) {
      console.log('hi');
      this.$axios.$put(`team/invitations/user_pending/${id}?answer=0`).then(res => [console.log(res)]);
    },
  },
  async fetch() {
    await this.$axios.$get('team/invitations/user_pending').then(res => {
      console.log(res);
      this.pending = res.data;
    });
  },
  async fetch() {
    await this.$axios.$get('team/invitations/team_sent').then(res => {
      console.log(res.data);
      this.reqHistory = res;
    });
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
