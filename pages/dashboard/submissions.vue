<template>
  <v-row>
    <v-col cols="12" md="4" class="pl-0">
      <v-card flat class="transparent">
        <SectionHeader :title="`ارسال کد`" :icon="`mdi-code-braces`" />
        <SectionContainer>
          <v-alert class=" px-1" type="info" outlined icon="mdi-information-outline">
            محدودیت زمانی بین هر ارسال:‌ ۳۰ دقیقه
            <br />
          </v-alert>
          <code-submission class="mt-10" @codeSub="this.$fetch" />
        </SectionContainer>
      </v-card>
    </v-col>
    <v-col cols="12" md="8" class="pr-md-0 pr-6 pl-5">
      <v-card flat class="transparent">
        <SectionHeader :title="`تاریخچه ارسال ها`" :icon="`mdi-history`" />
        <!-- <SectionContainer> -->
        <submissions-list class="py-6 py-md-12" :submissions="submissions" />
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
import { viewSubmissions } from '~/api/index';
import { mapState } from 'vuex';

export default {
  components: { CodeSubmission, SubmissionsList, SectionHeader, SectionContainer },
  layout: 'dashboard',
  transition: 'fade-transition',

  async fetch() {
    let data = await viewSubmissions(this.$axios);
    this.submissions = data.submissions;
  },
  data() {
    return {
      submissions: [],
    };
  },
};
</script>

<style scoped></style>
