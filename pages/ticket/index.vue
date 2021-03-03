<template>
  <div>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title style="margin:auto;">مدیریت تیکت ها</v-toolbar-title>
      </v-toolbar>
      <v-tabs centered grow>
        <v-tab>
          تیکت های خصوصی
          <v-icon class="pa-1">
            mdi-lock
          </v-icon>
        </v-tab>
        <v-tab>
          تیکت های عمومی
          <v-icon class="pa-1">
            mdi-lock-open
          </v-icon>
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <PrivateTickets />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <PublicTikects />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-btn color="primary" width="100%" @click="toggleNewTicket()">
      ساخت تیکت جدید
      <v-icon>
        mdi-plus-thick
      </v-icon> 
    </v-btn>
    <div v-if="this.toggleNewTickets" style="width: 50%; margin:auto; ">
      <NewTicket />
    </div>
  </div>
</template>

<script>
import PrivateTickets from '../../components/ticket/privateTickets';
import NewTicket from '../../components/ticket/NewTicket';
import PublicTikects from '../../components/ticket/PublicTikects';

export default {
  layout: 'landing',
  components: { PrivateTickets, NewTicket, PublicTikects },
  // auth: false,
  data() {
    return {
      toggleNewTickets: false,
      tab: null,
    };
  },
  methods: {
      toggleNewTicket(){
        this.toggleNewTickets = !this.toggleNewTickets
      },
  }
};
</script>

<style></style>
