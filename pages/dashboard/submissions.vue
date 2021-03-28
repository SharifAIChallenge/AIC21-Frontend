<template>
  
    <v-row>
    <v-col cols="4" class="pl-0">
      <v-card flat class="transparent">
        <SectionHeader :title="`ارسال کد`" :icon="`mdi-code-braces`"/>
        <v-alert
        class="mx-4 px-1"
        type="info"
        outlined
        icon="mdi-information-outline"
        >
        محدودیت زمانی بین هر ارسال:‌ ۳۰ دقیقه
        <br/>
        </v-alert>
        <v-card-text style="boder-radius:0px !important">
          <code-submission/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="8" class="pr-0 pl-">
      <v-card flat class="transparent">
        <v-card-text class="white--text text-h6">
          <v-icon>mdi-history</v-icon>
          تاریخچه ارسال ها
          <!-- <v-btn icon class="ms-3" @click="$store.dispatch('team/getSubmissions')">
            <v-icon>mdi-autorenew</v-icon>
          </v-btn> -->
        </v-card-text>
        <submissions-list/>
      </v-card>
    </v-col>
    </v-row>
  
</template>

<script>
import SectionHeader from "~/components/SectionHeader";
import dashboardPageValidate from '../../mixins/dashboardPageValidate'
import CodeSubmission from '../../components/dashboard/submission/CodeSubmission'
import SubmissionsList from '../../components/dashboard/submission/SubmissionsList'
import { mapState } from 'vuex'

export default {
  components: { CodeSubmission,SubmissionsList,SectionHeader },
  layout: 'dashboard',
  // mixins: [dashboardPageValidate('submissions')],
  transition: 'fade-transition',
  fetch({ store }) {
    return 
  },
  // computed: {
  //   ...mapState({
  //     submissions: state => state.team.submissions,
  //   }),
  // },
}
</script>

<style scoped></style>
