<template>
  <div>
    <v-form ref="createTeam" v-model="valid" onSubmit="return false;" @submit="uploadCode">
      <!-- <v-alert text icon="mdi-information" class="mb-6" transition="scale-transition">
      <v-chip>
        {{ $t('dashboard.submissions') }}
      </v-chip>
    </v-alert> -->

      <v-row>
        <v-chip-group style="display: flex" v-model="mode" column active-class="secondary--text secondary">
          <v-chip filter outlined>اصلی</v-chip>
          <v-chip disabled filter outlined>مینی‌گیم</v-chip>
        </v-chip-group>
        <v-col cols="12">
          <v-file-input
            v-model="file"
            v-bind="filedProps"
            label="فایل"
            :rules="fileRules"
            :hint="fileHint"
            accept=".zip"
            show-size
            persistent-hint
            append-icon="mdi-paperclip"
            prepend-icon=""
            dir="ltr"
          />
        </v-col>
        <v-col>
          <v-select
            v-model="language"
            v-bind="filedProps"
            :items="languageOptions"
            label="زبان"
            :rules="requiredRules"
            required
            dir="ltr"
          />
        </v-col>
      </v-row>
      <div class="mb-6">
        ارسال کد به‌منزله قبول تمامی
        <nuxt-link to="/dashboard/doc/6-rules">قوانین و شرایط مسابقه</nuxt-link>
        است
      </div>
      <v-btn tile block :disabled="true" :loading="loading" type="submit" v-bind="primaryButtonProps">
        <v-icon left>mdi-upload</v-icon>
        ارسال
      </v-btn>
      <!-- <v-btn
        tile
        block
        :disabled="!file || !canSubmitAnotherCode || !profile || !profile.is_finalist || !isFinalPayed"
        :loading="loading"
        type="submit"
        v-bind="primaryButtonProps"
      >
        <v-icon left>mdi-upload</v-icon>
        ارسال
      </v-btn> -->
    </v-form>
  </div>
</template>

<script>
import { requiredRules } from '../../../mixins/formValidations';
import { primaryButtonProps } from '../../../mixins/buttonProps';
import { fieldProps } from '../../../mixins/fieldProps';
import { submitLargeCode } from '../../../api';
import { mapState } from 'vuex';

export default {
  mixins: [requiredRules, primaryButtonProps, fieldProps],
  props: ['canSubmitAnotherCode'],
  data() {
    return {
      valid: false,
      file: null,
      language: 'jar',
      languageOptions: [
        { text: 'Jar', value: 'jar' },
        { text: 'Python 3', value: 'py3' },
        { text: 'Cpp', value: 'cpp' },
      ],
      fileHint: 'zip',
      fileRules: [v => !!v || ''],
      loading: false,
      mode: 0,
      isFinalPayed: false,
    };
  },
  async fetch() {
    let res = await this.$axios.$get('team');
    this.isFinalPayed = res.final_payed;
  },
  computed: {
    ...mapState({
      profile: state => state.auth.user,
    }),
  },
  methods: {
    async uploadCode() {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('language', this.language);
      formData.append('is_mini_game', this.mode === 1);

      this.loading = true;
      let data = await submitLargeCode(this.$axios, formData);
      this.loading = false;
      if (data.status_code) {
        if (data.status_code === 200) {
          this.$toast.success('فایل با موفقیت آپلود شد.');
          this.$emit('codeSub');
        } else if (data.detail.non_field_errors) {
          if (data.detail.non_field_errors[0].includes('wait'))
            this.$toast.error(this.$tc('dashboard.codeSubmissionMessage', this.codeSubmitDelay));
        } else if (data.status_code == 403) {
          this.$toast.error('ابتدا باید در تیمی عضو شوید');
        } else {
          this.$toast.error('خطایی در آپلود فایل رخ داد.');
        }
      }
    },
  },
};
</script>
