<template>
  <div class="notif-wrapper">
    <v-card-text class="d-flex align-center">
      <v-icon large class="primary--text pl-3">mdi-bell-ring-outline</v-icon>
      <span class="white--text text-h5">اعلان ها</span>
    </v-card-text>
    <v-timeline dense fill-dot>
      <v-timeline-item small v-for="(notif, index) in notifs" :key="index">
        <v-card flat tile class="ml-4" style="background-color: #141432; border-radius: 0">
          <v-card-text class="py-1 white--text text-body-1">
            {{ notif.text }}
          </v-card-text>
          <v-card-subtitle class="py-1 text-left text-caption">
            {{ new Intl.DateTimeFormat($i18n.locale).format(new Date(notif.create_date)) }}
          </v-card-subtitle>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  async fetch() {
    let dataPub = await this.$axios.$get('/notifications');
    let dataPri = await this.$axios.$get('/notifications/public');
    this.notifs = dataPub.notifications;
    this.notifs = [...this.notifs, ...dataPri.notifications];
    this.notifs.sort((a, b) => {
      return a.create_date > b.create_date;
    });
    this.notifs.reverse();
  },
  data() {
    return {
      notifs: [],
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'assets/variables.scss';
.notif-wrapper {
  background: map-get($material-dark-elevation-colors, '12');
}
</style>
