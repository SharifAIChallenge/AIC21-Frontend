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
        <v-btn color="primary" @click="hel()">
          ساخت تیکت جدید
          <v-icon>
            mdi-plus-thick
          </v-icon>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      amenities: [0, 1],
      generalTicket: 0,
    };
  },
  methods: {
    hel() {
      console.log(this.generalTicket);
    },
  },
};
</script>

<style></style>
