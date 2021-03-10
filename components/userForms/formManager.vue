<template>
  <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
    <div class="close-btn" @click="toggleShow()">X</div>
    <div class="form-wrapper">
      <login v-if="form === 'login'" />
      <forgotPassword v-if="form === 'forgot'" />
      <signUp v-if="form === 'signUp'" />
    </div>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import login from '../userForms/login';
import forgotPassword from '../userForms/forgotPassword';
import signUp from '../userForms/signUp';

export default {
  components: { login, forgotPassword, signUp },
  props: ['isPage'],
  methods: {
    toggleShow() {
      if (this.isPage) this.$router.push('/');
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
