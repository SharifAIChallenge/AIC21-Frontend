<template>
  <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn
      class='ma-3'
      icon
      x-large
      @click="toggleShow()"
    >
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>

    <div class="form-wrapper">
      <login v-if="form === 'login'" />
      <forgotPassword v-if="form === 'forgot'" />
      <signUp v-if="form === 'signUp'" />
      <resetPassword v-if="form === 'reset'" />
    </div>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import login from '../userForms/login';
import forgotPassword from '../userForms/forgotPassword';
import signUp from '../userForms/signUp';
import resetPassword from '../userForms/resetPassword';

export default {
  components: { login, forgotPassword, signUp, resetPassword },
  props: ['isPage'],
  methods: {
    toggleShow() {
      if (this.isPage) this.$router.push('/');
      this.$store.commit('formStatus/toggleShow');
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

<style lang="scss" scoped>
@import 'assets/variables.scss';
.form-wrapper {
  width: 100%;
}
.close-btn {
  background-color: map-get($map: $material-dark, $key: 'background');
  font-size: 50px;
  margin-right: 15px;
  cursor: pointer;
}
.v-dialog__content--active {
  background-color: map-get($map: $material-dark, $key: 'background');
}
</style>
