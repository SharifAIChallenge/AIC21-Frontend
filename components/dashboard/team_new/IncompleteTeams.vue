<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols='12'>
          <v-data-table :headers='header' :items='team'
                        :page.sync='page' :items-per-page='itemsPerPage'
                        hide-default-footer
                        class='elevation-1'
                        @page-count='pageCount=$event'>
            <template v-slot:item.image='{ item }'>
              <img :src='item.image' alt='' style='width: 50px; height: 50px  ' />
            </template>
            <template v-slot:item.profile='{ item }'>
              <v-icon @click='showTeam(item)'>
                mdi-card-account-details-outline
              </v-icon>
            </template>
            <template v-slot:item.sendRequest='{ item }'>
              <v-icon @click='sendRequest(item.id)'>
                mdi-plus-circle-outline
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-dialog v-model='teamDetails' width='350px'>
        <v-card>
          <img :src='teamInfo.image' width='350px' :alt='teamInfo.name'>
          {{ teamInfo.name }}
          <v-container>
            <v-row v-for='(member,index) in teamInfo.members' :key='index'>
              <v-col cols='10'>
                {{ member.first_name + '' + member.last_name }}
              </v-col>
              <v-col>
                <v-icon>
                  mdi-card-account-details-outline
                </v-icon>
              </v-col>
              <v-col cols='12' class='d-flex justify-content-center'>
                <v-btn flat color='primary' class='mt-5' @click='sendRequest(teamInfo.id)'>ارسال درخواست عضویت</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <div>
        <v-pagination v-model='page' :length='pageCount'></v-pagination>
      </div>
    </v-container>
  </div>
</template>
<script>


export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      teamDetails: false,
      teamInfo: {},
      header: [
        { text: 'تصویر', value: 'image' },
        { text: 'نام تیم', value: 'name' },
        { text: 'پروفایل', value: 'profile' },
        { text: 'ارسال درخواست عضویت', value: 'sendRequest' },
      ],
      team: [],
    };
  },
  methods: {
    sendRequest(team) {
      this.$axios.post('team/invitations/user_sent', { team }).then(res => {
        console.log(res.data);
        if (res.data.status_code === 200) {
          this.$toast.success(this.translateResponseMessage(res.data.message));
        } else {
          this.$toast.error(res.data.message);
        }
      });
    },
    showTeam(team) {
      this.teamDetails = true;
      this.teamInfo = team;
      console.log(team);
    },
  },
  async fetch() {
    await this.$axios.$get('/team/incomplete').then(res => {
      // this.incompleteTeams = res.data;
      console.log(res.results.data);
      this.team = res.results.data;
    });
  },
};
</script>
