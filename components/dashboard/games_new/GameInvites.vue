<template>
  <div>
    <v-alert icon="mdi-information" class="mb-8">
      ایجا لیست دعوتنامه هایی را که از تیم ها برای بازی با آن ها دریافت کرده اید، می بینید.
    </v-alert>
    <div v-if="this.pendingRequests.length === 0" class="mb-10">
      لیست دعوتنامه های شما خالی است
    </div>


  </div>
</template>
<script>
import SectionContainer from '~/components/SectionContainer';
export default {
  components: {
    SectionContainer,
  },
  data() {
    return {
      pendingRequests: [],
      sentRequests: [],
    };

  },
  async fetch() {
    let res1 = await this.$axios.$get('challenge/request?source=1');
    let res2 = await this.$axios.$get('challenge/request?source=0');
    this.pendingRequests=res1;
    this.sentRequests=res2;
    console.log(res2)
  },
};
</script>
<style lang='scss' scoped>

</style>