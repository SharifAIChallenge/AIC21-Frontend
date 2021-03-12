<template>
  <div>
    <SectionHeader title="تغییر رمز عبور" icon="mdi-form-textbox-password" />
    <SectionContainer>
      <v-form ref="changePassword" v-model="valid" @submit.prevent="resetPasswordConfirm">
        <password-input v-model="passes.oldPassword" label="form.currentPassword" />

        <password-input v-model="passes.newPassword1" label="form.newPassword" @vis-change="val => (show = val)" />

        <v-text-field
          v-model="passes.newPassword2"
          :label="$t('form.confirmNewPassword')"
          :type="show ? 'text' : 'password'"
          :rules="requiredRules"
          required
          v-bind="filedProps"
          dir="ltr"
        />

        <v-btn block :disabled="!valid || passes.newPassword1 !== passes.newPassword2" :loading="loading" type="submit">
          <v-icon left>mdi-shield-edit-outline</v-icon>
          {{ $t('form.changePassword') }}
        </v-btn>
      </v-form>
    </SectionContainer>
  </div>
</template>

<script>
import { requiredRules } from '../../../mixins/formValidations';
import { fieldProps } from '../../../mixins/fieldProps';
import PasswordInput from '../../PasswordInput';
import { CHANGE_PASSWORD, changePassword } from '../../../api';
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';

export default {
  components: { SectionHeader, SectionContainer, PasswordInput },
  mixins: [requiredRules, fieldProps],
  data() {
    return {
      valid: false,
      passes: { oldPassword: '', newPassword1: '', newPassword2: '' },
      show: false,
      loading: false,
    };
  },
  methods: {
    async resetPasswordConfirm() {
      this.loading = true;
      let data = await changePassword(this.$axios, this.passes);
      this.loading = false;
      if (data.status_code) {
        if (data.status_code === 200) {
          this.$toast.success('رمز عبور با موفقیت تغییر یافت.');
          this.$refs.changePassword.reset();
        } else {
          this.$toast.error('رمز عبور اشتباه است.');
        }
      }
    },
  },
};
</script>
