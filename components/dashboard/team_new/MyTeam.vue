<template>
  <div>
    {{ team }}
  </div>
</template>

<script>
export default {
  auth: false,
  async fetch() {
    await this.$axios.$get('team').then(res => {
      this.team = res;
    });
  },
  data() {
    return {
      team:{},
    };
  },
};
</script>

<style></style>
