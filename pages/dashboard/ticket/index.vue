<template>
  <v-container class="mt-10 tickets mb-13" style="position: relative">
    <v-row class="mb-2 px-1">
      <v-col cols="12" sm="5" class="pa-0">
        <!-- <div style="display:  flex;"> -->
        <v-chip-group
          style="display: flex"
          v-model="amenities"
          column
          multiple
          active-class="secondary--text secondary"
          v-if="generalTicket === 0"
        >
          <v-chip filter outlined>حل شده</v-chip>
          <v-chip filter outlined>حل نشده</v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="12" sm="4" class="pa-0">
        <v-chip-group style="display: flex" v-model="generalTicket" column active-class="secondary--text secondary">
          <v-chip filter outlined>شخصی</v-chip>
          <v-chip filter outlined>عمومی</v-chip>
        </v-chip-group>
      </v-col>
      <!-- </div> -->
      <v-col cols="12" sm="3" class="pa-0 pl-4">
        <v-btn color="primary mr-2" @click="toggleNewTicket()" width="100%">
          ساخت تیکت جدید
          <v-icon>mdi-plus-thick</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="showNewTicket" width="600" @click:outside="toggleNewTicket()">
      <v-card>
        <div @click="toggleNewTicket()">
          <v-btn icon>
            <h2>
              <v-icon>mdi-close</v-icon>
            </h2>
          </v-btn>
        </div>
        <NewTicket :toggleNewTicket="toggleNewTicket" />
      </v-card>
    </v-dialog>
    <div v-if="generalTicket === 0">
      <PrivateTickets :ticketStatus="amenities" :data="filter(privateTicketData)" :loadingTable="loadingTable" />
    </div>
    <div v-else>
      <PublicTikects :data="publicTicketData" :action="false" />
    </div>
    <!-- <Logo /> -->
  </v-container>
</template>

<script>
import PrivateTickets from '~/components/ticket/privateTickets';
import PublicTikects from '~/components/ticket/PublicTikects';
import NewTicket from '~/components/ticket/NewTicket';
import Logo from '~/components/dashboard/Logo';

export default {
  layout: 'dashboard',
  components: { PrivateTickets, NewTicket, PublicTikects, Logo },
  async fetch() {
    this.loadingTable = true;
    let res = await this.$axios.$get('/ticket');
    this.privateTicketData = res.data;
    res = await this.$axios.$get('/ticket/publicTickets');
    this.publicTicketData = res.data;
    this.loadingTable = false;
  },
  data() {
    return {
      amenities: [0, 1],
      generalTicket: 0,
      showNewTicket: false,
      privateTicketData: [],
      publicTicketData: [],
      loadingTable: false,
    };
  },
  methods: {
    toggleNewTicket() {
      this.showNewTicket = !this.showNewTicket;
      this.$fetch();
    },
    filter(data) {
      if (this.amenities.length === 2 || this.amenities.length === 0) {
        return data;
      } else {
        if (this.amenities[0] === 0) {
          return data.filter(data => data.status === 'closed');
        } else if (this.amenities[0] === 1) {
          return data.filter(data => data.status === 'open');
        }
      }
    },
  },
};
</script>

<style></style>
