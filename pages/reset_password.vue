<template></template>

<script>
export default {
  layout: 'form',
  mounted() {
    console.log('1');
    this.$store.commit('formStatus/toggleShow');
    this.$store.commit('formStatus/changeStatus', 'reset');
  },
};
</script>
