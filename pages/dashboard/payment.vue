<template>
  <div class="d-flex justify-center align-center" style="height: 100vh">
    <div>
      <div class="text-center">
        <v-icon v-if="status == 100" size="70" color="primary">
          mdi-cash-check
        </v-icon>
        <v-icon v-else size="70" color="error">
          mdi-sticker-remove-outline
        </v-icon>
      </div>
      <div class="text-h4 mt-4">{{ desc }}</div>
      <div class="text-center mt-6">
        <span class="ml-3">
          رسید پرداخت
        </span>
        <span>
          {{ ref_id }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  asyncData({ query }) {
    const { desc, status, ref_id } = query;
    return { desc, status, ref_id };
  },
};
</script>

<style></style>
