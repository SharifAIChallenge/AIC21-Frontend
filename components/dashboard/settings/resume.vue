<template>
  <div class="pa-5">
    <v-form ref="editProfile" v-model="valid" onSubmit="return false;" @submit="signUp">
      <v-row>
        <div class="pa-3 d-flex align-center mb-12">
          <v-icon class="ml-1" color="primary">mdi-account-circle-outline</v-icon>
          <h2>اطلاعات شخصی</h2>
        </div>
      </v-row>
      <!-- <v-row>
        <v-col cols="12" class="d-flex mb-8">
          <div class="pa-2 bg"><v-icon>mdi-trash-can-outline</v-icon></div>
          <div v-if="information.resume !== null" class="secondary pa-2" style="width:100%">
            <v-icon>mdi-file-download-outline</v-icon>
            <a :href="information.resume.name" target="_blanck">
              <span>{{ information.resume.name }}</span>
            </a>
          </div>
        </v-col>
      </v-row> -->
      <v-row class="resume">
        <v-col class="py-0 mb-3" cols="12">
          <v-file-input
            v-model="information.resume"
            label="تغییر فایل"
            outlined
            dense
            prepend-icon="mdi-file-download-outline"
            clear-icon="mdi-file-download-outline"
            @change="edited"
          ></v-file-input>
          <!-- <v-text-field
            v-if="$i18n.locale === 'fa'"
            v-model="information.firstnameFa"
            :label="$t('form.nameInPersian')"
            required
            :rules="requiredRules"
            v-bind="filedProps"
            @keyup="edited"
          /> -->
        </v-col>
      </v-row>
      <v-row class="justify-space-between pa-3">
        <v-btn style="flex-basis: 20%;">لغو</v-btn>
        <v-btn :disabled="!valid || disable" :loading="loading" type="submit" color="primary" style="flex-basis: 75%;">
          <v-icon left>mdi-content-save-outline</v-icon>
          {{ $t('dashboard.editProfile') }}
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { emailRules, requiredRules } from '../../../mixins/formValidations';
import { primaryButtonProps } from '../../../mixins/buttonProps';
import { fieldProps } from '../../../mixins/fieldProps';
import { editProfile } from '../../../api';

export default {
  mixins: [requiredRules, emailRules, primaryButtonProps, fieldProps],
  data() {
    return {
      valid: false,
      loading: false,
    };
  },

  props: {
    information: Object,
    edited: Function,
    disable: Boolean,
    signUp: Function,
  },
  methods: {},
};
</script>
<style lang="scss">
.resume {
  min-height: calc(100vh - 200px);
  .v-input__prepend-outer {
    position: absolute;
    left: 3px;
  }
  .v-input__append-inner {
    display: none;
  }
}
</style>
