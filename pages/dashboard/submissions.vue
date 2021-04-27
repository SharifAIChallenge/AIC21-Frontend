<template>
  <v-row>
    <v-col cols="12" md="4" class="pl-0">
      <v-card flat class="transparent">
        <SectionHeader :title="`ارسال کد`" :icon="`mdi-code-braces`" />
        <SectionContainer>
          <v-alert class=" px-1" type="info" outlined icon="mdi-information-outline">
            <p v-if="canSubmitAnotherCode">
              محدودیت زمانی بین هر ارسال:‌ ۵ دقیقه
            </p>
            <p v-else>
              <span>
                زمان گذشته از آخرین ارسال:
              </span>
              <span>
                {{ Math.floor(remainTime) }}
                دقیقه
              </span>
            </p>
          </v-alert>
          <code-submission class="mt-10" @codeSub="this.$fetch" :canSubmitAnotherCode="canSubmitAnotherCode" />
        </SectionContainer>
      </v-card>
    </v-col>
    <v-col cols="12" md="8" class="pr-md-0 pr-6 pl-5">
      <v-card flat class="transparent">
        <SectionHeader :title="`تاریخچه ارسال ها`" :icon="`mdi-history`" />
        <!-- <SectionContainer> -->
        <v-chip-group style="display: flex" v-model="mode" column active-class="secondary--text secondary">
          <v-chip filter outlined>اصلی</v-chip>
          <v-chip filter outlined>مینی‌گیم</v-chip>
        </v-chip-group>
        <submissions-list class="py-6 py-md-12" :submissions="submissions.filter(s => mode == s.is_mini_game)" />

        <!-- </SectionContainer> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import CodeSubmission from '../../components/dashboard/submission/CodeSubmission';
import SubmissionsList from '../../components/dashboard/submission/SubmissionsList';

export default {
  components: { CodeSubmission, SubmissionsList, SectionHeader, SectionContainer },
  layout: 'dashboard',
  transition: 'fade-transition',

  async fetch() {
    let data = await this.$axios.$get(`/team/submission`);
    this.submissions = data.submissions;
    this.calculateTimeInterval();
  },
  data() {
    return {
      submissions: [],
      canSubmitAnotherCode: false,
      interval: null,
      remainTime: 0,
      mode: 0,
    };
  },
  methods: {
    async getData() {
      let data = await this.$axios.$get(`/team/submission`);
      this.submissions = data.submissions;
    },
    calculateTimeInterval() {
      if (!this.submissions.length) this.canSubmitAnotherCode = true;
      else {
        const lastSubmitTime = new Date(this.submissions[this.submissions.length - 1].submit_time);
        const interval = new Date() - lastSubmitTime;
        this.remainTime = interval / (60 * 1000);
        this.canSubmitAnotherCode = this.remainTime > 5;
      }
    },
  },
  mounted() {
    this.interval = setInterval(this.calculateTimeInterval, 1000 * 60);
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped></style>
