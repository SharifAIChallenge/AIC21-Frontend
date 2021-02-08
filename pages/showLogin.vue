<template>
  <v-app>
    <div v-if="show"> <login />
    </div>
    <div v-else>
    <v-btn @click="toggleShow">
      click
    </v-btn>
    </div>



  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { state } from '~/store/dashboard';
import login from '../components/userForms/login';

export default {
  auth: false,
  layout: 'empty',
  components: { login },
  methods: {
    toggleShow(){
      this.$store.commit('formStatus/toggleShow')
    },
    changeStatus(form){
      this.$store.commit('formStatus.js',form)
    }
  },
  computed: {
    ...mapState({
      show : state => state.formStatus.show
    }),
   }
};
</script>

<style></style>
