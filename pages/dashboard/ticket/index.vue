<template>
  <v-container class="mt-16">
    <div style="display: flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="display: flex;">
          <v-chip-group v-model="amenities" column multiple active-class="secondary--text secondary" v-if="generalTicket === 0">
            <v-chip filter outlined>
              حل شده
            </v-chip>
            <v-chip filter outlined>
              حل نشده
            </v-chip>
          </v-chip-group>
          <v-chip-group v-model="generalTicket" column active-class="secondary--text secondary">
            <v-chip filter outlined>
              شخصی
            </v-chip>
            <v-chip filter outlined>
              عمومی
            </v-chip>
          </v-chip-group>
        </div>
      </div>
      <div>
        <v-btn color="primary" @click="toggleNewTicket()">
          ساخت تیکت جدید
          <v-icon>
            mdi-plus-thick
          </v-icon>
        </v-btn>
      </div>
    </div>

    <v-dialog v-model="showNewTicket" width="600" @click:outside="toggleNewTicket()">
      <v-card>
        <div @click="toggleNewTicket()">
          <v-btn icon>
            <h2>
              <v-icon>
                mdi-close
              </v-icon>
            </h2>
          </v-btn>
        </div>
        <NewTicket />
      </v-card>
    </v-dialog>
    <div v-if="generalTicket === 0">
      <PrivateTickets :ticketStatus="amenities" :data="filter(privateTicketData)" :loadingTable="loadingTable" />
    </div>
    <div v-else>
      <PublicTikects :data="publicTicketData" />
    </div>
  </v-container>
</template>

<script>
import PrivateTickets from '~/components/ticket/privateTickets';
import PublicTikects from '~/components/ticket/PublicTikects';
import NewTicket from '~/components/ticket/NewTicket';

export default {
  layout: 'dashboard',
  transition: 'fade-transition',
  components: { PrivateTickets, NewTicket, PublicTikects },
  async fetch() {
    this.loadingTable = true;
    await this.$axios.$get('/ticket').then(res => {
      this.privateTicketData = res.data;
    });
    this.loadingTable = false;
    this.$axios.$get('/ticket/publicTickets').then(res => {
      this.publicTicketData = res.data;
    });
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
