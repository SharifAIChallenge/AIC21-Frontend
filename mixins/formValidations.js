export const emailRules = {
  computed: {
    emailRules() {
      return [v => !!v || '', v => /.+@.+\..+/.test(v) || this.$t('validation.email')];
    },
  },
};

export const requiredRules = {
  computed: {
    requiredRules() {
      return [v => !!v];
    },
  },
};

export const phoneRules = {
  computed: {
    phoneRules() {
      return [v => !!v || '', v => /^[\d]{11}$/.test(v) || this.$t('validation.phoneNumber')];
    },
  },
};
