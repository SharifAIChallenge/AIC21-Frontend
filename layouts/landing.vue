<template>
  <v-app>
    <div v-if="show">
      <formManager />
    </div>
    <div v-else>
      <v-main>
        <Social />
        <nuxt />
      </v-main>
      <call-to-action />
      <my-footer />
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import MyFooter from '../components/MyFooter';
import CallToAction from '~/components/CallToAction.vue';
import Social from '../components/landing/Social.vue';
import formManager from '../components/userForms/formManager';
export default {
  components: { MyFooter, CallToAction, Social, formManager },

  methods:{
        toggleShow() {
      this.$store.commit('formStatus/toggleShow');
    },
    changeStatus(form) {
      this.$store.commit('formStatus/changeStatus', form);
    },
  },
    computed: {
    ...mapState({
      show: state => state.formStatus.show,
    }),
  },
      computed: {
    ...mapState({
      show: state => state.formStatus.show,
    }),
      },
};
</script>

<style></style>
