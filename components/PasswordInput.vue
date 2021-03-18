<template>
  <v-text-field
    :value="value"
    :label="$t(label)"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    :rules="requiredRules"
    required
    class="autofill-bg"
    outlined
    :autofocus="autofocus"
    dir="ltr"
    @input="val => $emit('input', val)"
    @click:append="toggle"
  />
</template>

<script>
import { requiredRules } from '../mixins/formValidations';

export default {
  mixins: [requiredRules],
  props: {
    value: {
      type: String,
    },
    autofocus: {
      type: Boolean,
    },
    label: {
      type: String,
      default: 'form.password',
    },
  },
  data() {
    return {
      password: '',
      show: false,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
      this.$emit('vis-change', this.show);
    },
  },
};
</script>

<style scoped></style>
