<template>
  <dashboard-page title="dashboard.termsAndConditions">
    <v-col>
      <v-card>
        <v-card-text v-html="term" />
      </v-card>
    </v-col>
  </dashboard-page>
</template>

<script>
import dashboardPageValidate from '../../mixins/dashboardPageValidate'
import DashboardPage from '../../components/dashboard/DashboardPage'

export default {
  components: { DashboardPage },
  layout: 'dashboard',
  mixins: [dashboardPageValidate('terms')],
  transition: 'fade-transition',
  async asyncData({ $axios }) {
    return await $axios.$get('/terms')
  },
  data() {
    return {
      term: '',
    }
  },
}
</script>

<style scoped></style>
