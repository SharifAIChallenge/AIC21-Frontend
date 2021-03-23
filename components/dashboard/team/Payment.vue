<template>
  <div v-if="!payed" class="mt-8">
    <v-alert icon="mdi-cash-multiple" class="mb-8">
      {{ config.description }}
      <div class="my-8">
        <span>
          مبلغ:
        </span>
        <span class="mr-6">
          <strong>{{ config.amount }} تومان</strong>
        </span>
      </div>
    </v-alert>

    <div>
      <v-btn block :href="gatewayLink">
        پرداخت
      </v-btn>
    </div>
  </div>

  <div v-else>
    <v-alert icon="mdi-emoticon-excited-outline" class="mb-8">
      <div class="text-h6">
        پرداخت تیم شما با موفقیت انجام شد
      </div>
    </v-alert>
  </div>
</template>

<script>
export default {
  props: ['payed'],
  data() {
    return {
      config: {
        amount: '',
        description: '',
      },
      gatewayLink: '',
    };
  },
  async fetch() {
    let res = await this.$axios.get('payment/config');
    this.config = res.data.config;
    res = await this.$axios.post('payment/request');
    this.gatewayLink = res.data.url;
  },
  methods: {},
};
</script>

<style></style>
