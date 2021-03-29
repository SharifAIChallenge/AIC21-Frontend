<template>
  <div>
    <SectionHeader title="دعوت نامه ها" icon="mdi-history" />
    <SectionContainer>
      <v-alert icon="mdi-information" class="mb-8">
        اینجا لیست دعوتنامه هایی را که از تیم ها برای بازی با آن ها دریافت کرده اید، می بینید.
      </v-alert>
      <div v-if="this.pendingRequests.length === 0" class="mb-10">
        لیست دعوتنامه های شما خالی است
      </div>
      <div v-else class="mb-10">
        <div class="mb-7" v-for="(request, index) in pendingRequests" :key="index">
          <div>
            <div class="d-flex align-end pr-16 mb-2" style="height:100%">
              {{ request.source_team_name }}
            </div>
          </div>
          <div class="mr-16">
            <v-btn height="50" class="ml-4" @click="declineChallenge(request.id)" :loading="loading">
              رد کردن
            </v-btn>
            <v-btn color="primary" height="50" @click="acceptChallenge(request.id)" :loading="loading">
              <v-icon>
                mdi-handshake
              </v-icon>
              قبول کردن
            </v-btn>
          </div>
        </div>
      </div>
      <v-alert icon="mdi-information" class="mb-8">
        اینجا لیست دعوتنامه هایی را که برای بازی با سایر تیم ها ارسال کرده اید میبینید.
      </v-alert>
      <div>
        <div
          v-for="(request, index) in sentRequests"
          :key="index"
          class="mb-7"
          style="display:flex; flex-direction: row; justify-content:space-between;"
        >
          <div>
            <h3>
              {{ request.target_team_name }}
            </h3>
          </div>
          <div
            v-bind:class="{
              blueFont: request.status === 'pending',
              orangeFont: request.status === 'rejected',
              greenFont: request.status === 'accepted',
            }"
          >
            <h3>
              {{ request.status }}
            </h3>
          </div>
          <div>
            <v-icon
              large
              v-bind:class="{
                blueFont: request.status === 'pending',
                orangeFont: request.status === 'rejected',
                greenFont: request.status === 'accepted',
              }"
            >
              {{ requestStatusIcon(request.status) }}
            </v-icon>
          </div>
        </div>
      </div>
    </SectionContainer>
  </div>
</template>
<script>
import SectionContainer from '~/components/SectionContainer';
import SectionHeader from '~/components/SectionHeader';

export default {
  components: {
    SectionContainer,
    SectionHeader,
  },
  data() {
    return {
      pendingRequests: [],
      sentRequests: [],
      loading: false,
    };
  },
  methods: {
    acceptChallenge(id) {
      this.loading = true;
      this.$axios.$put(`challenge/request/${id}?answer=1`).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('با موفقیت انجام شد!');
        } else {
          this.$toast.error('مشکلی رخ داده است!');
        }
      });
      this.pendingRequests = this.pendingRequests.filter(item => item.id !== id);
      this.loading = false;
    },
    declineChallenge(id) {
      this.loading = true;
      this.$axios.$put(`challenge/request/${id}?answer=0`).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('با موفقیت انجام شد!');
        } else {
          this.$toast.error('مشکلی رخ داده است!');
        }
      });
      this.pendingRequests = this.pendingRequests.filter(item => item.id !== id);
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
  async fetch() {
    let res1 = await this.$axios.$get('challenge/request?source=0');
    let res2 = await this.$axios.$get('challenge/request?source=1');
    if (res1.status_code === 403) {
      this.$toast.error('برای دیدن این قسمت ابتدا باید ارسال نهایی داشته باشید!');
    } else {
      this.pendingRequests = res1.data.filter(item => item.status === 'pending');
      this.sentRequests = res2.data;
    }
    //TODO: check other error status code
  },
};
</script>
<style lang="scss" scoped>
.blueFont {
  color: rgb(41, 37, 255);
}

.orangeFont {
  color: orange;
}

.greenFont {
  color: green;
}
</style>
