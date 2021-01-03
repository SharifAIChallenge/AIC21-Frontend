<template>
  <dashboard-page title="dashboard.tutorials">
    <resource-page :data="data" />
  </dashboard-page>
</template>

<script>
import DashboardPage from '../../components/dashboard/DashboardPage'
import dashboardPageValidate from '../../mixins/dashboardPageValidate'
import ResourcePage from '../../components/dashboard/ResourcePage'

export default {
  components: { ResourcePage, DashboardPage },
  layout: 'dashboard',
  transition: 'fade-transition',
  mixins: [dashboardPageValidate('tutorials')],
  async asyncData({ $axios }) {
    return { data: await $axios.$get('/resources/1') }
  },
  data() {
    return {
      data: {
        description_fa: '',
        sections: [],
      },
    }
  },
}
</script>

<style scoped></style>
