<template>
  
    <v-row>
    <v-col cols="12" md="4" class="pl-0">
      <v-card flat class="transparent">
        <SectionHeader :title="`ارسال کد`" :icon="`mdi-code-braces`"/>
        <v-alert
        class="mx-md-4 mx-15 px-1"
        type="info"
        outlined
        icon="mdi-information-outline"
        >
        محدودیت زمانی بین هر ارسال:‌ ۳۰ دقیقه
        <br/>
        </v-alert>
        <v-card-text style="boder-radius:0px !important">
          <code-submission class="px-12 px-md-0"/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="8" class="pr-md-0 pr-6 pl-5">
      <v-card flat class="transparent">
        <SectionHeader :title="`تاریخچه ارسال ها`" :icon="`mdi-history`"/>
        <submissions-list :submissions="submissions"/>
      </v-card>
    </v-col>
    </v-row>
  
</template>

<script>
import SectionHeader from "~/components/SectionHeader";
import CodeSubmission from '../../components/dashboard/submission/CodeSubmission'
import SubmissionsList from '../../components/dashboard/submission/SubmissionsList'
import {viewSubmissions} from "~/api/index";
import { mapState } from 'vuex'

export default {
  components: { CodeSubmission,SubmissionsList,SectionHeader },
  layout: 'dashboard',
  // mixins: [dashboardPageValidate('submissions')],
  transition: 'fade-transition',

    async fetch(){
    let data = await viewSubmissions(this.$axios)
    console.log(data);
    this.submissions=data.submissions
  },
  data(){
    return{
      submissions:[]
    }
  }
  // computed: {
  //   ...mapState({
  //     submissions: state => state.team.submissions,
  //   }),
  // },
}
</script>

<style scoped></style>
