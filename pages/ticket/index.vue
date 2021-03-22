<template>
  <v-container class="mt-16">
    <div style="display: flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="display: flex;">
          <v-chip-group v-model="amenities" column multiple active-class="secondary--text secondary">
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
    <div v-if="this.showNewTicket">
      <NewTicket  />
    </div>
    <div>
      <PrivateTickets :ticketStatus="amenities" />
    </div>
  </v-container>
</template>

<script>
import PrivateTickets from '../../components/ticket/PrivateTickets';
import NewTicket from '../../components/ticket/NewTicket';

export default {
  auth: false,
  components: { PrivateTickets, NewTicket },
  data() {
    return {
      amenities: [0, 1],
      generalTicket: 0,
      showNewTicket: false,
    };
  },
  methods: {
    toggleNewTicket() {
      this.showNewTicket = !this.showNewTicket;
    },
  },
};
</script>

<style></style>
