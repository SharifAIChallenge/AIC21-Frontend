<template></template>

<script>
export default {
  layout: 'form',
  mounted() {
    console.log(this.$route.path);
    this.$store.commit('formStatus/toggleShow');
    this.$store.commit('formStatus/changeStatus', 'login');
  },
};
</script>
