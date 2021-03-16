<template></template>

<script>
export default {
  layout: 'form',
  mounted() {
    this.$store.commit('formStatus/toggleShow');
    this.$store.commit('formStatus/changeStatus', 'reset');
  },
};
</script>
