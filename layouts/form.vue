<template>
  <v-app>
    <formManager :isPage="true" />
    <nuxt />
  </v-app>
</template>

<script>
import formManager from '../components/userForms/formManager';

export default {
  components: { formManager },
};
</script>

<style scoped></style>
