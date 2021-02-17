<template>
  <v-app>
    <div class="main">
      <div v-if="show">
        <div v-if="form === 'login'">
          <login />
        </div>
        <div v-if="form === 'forgot'">
          <forgotPassword />
        </div>
        <div v-if="form === 'signUp'">
          <signUp />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import login from '../userForms/login';
import forgotPassword from '../userForms/forgotPassword';
import signUp from '../userForms/signUp';

export default {
  components: { login, forgotPassword, signUp },

  methods: {
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
      form: state => state.formStatus.form,
    }),
  },
};
</script>

<style>
.main-form {
  background-color: #090c18;
  width: 100%;
  height: 100%;
}
</style>
