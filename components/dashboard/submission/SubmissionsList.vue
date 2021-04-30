<template>
  <div>
    <v-data-table
      :headers="headers"
      center
      :items="submissions"
      :page.sync="page"
      :items-per-page="20"
      hide-default-footer
      item-key="id"
      locale="fa"
      sort-by="submit_time"
      sort-desc
      @page-count="pageCount = $event"
    >
      <template v-slot:[`item.is_final`]="{ item }">
        <v-btn icon disabled @click="changeFinal(item)">
          <v-icon>
            {{ item.is_final || item.is_mini_game_final ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <submission-status :status="item.status" />
      </template>
      <template v-slot:[`item.language`]="{ item }">
        <language-icon :language="item.language" />
      </template>
      <template v-slot:[`item.user`]="{ item }">
        <!-- {{ item.user.profile.firstname_fa + ' ' + item.user.profile.lastname_fa }} -->
        {{ item.user }}
      </template>
      <template v-slot:[`item.submit_time`]="{ item }">
        <date-time-formatter :date="item.submit_time" />
      </template>
      <template v-slot:[`item.file`]="{ item }">
        <v-btn v-if="item.download_link" icon :href="item.download_link">
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.log`]="{ item }">
        <v-btn icon @click="onDetailClick(item.infra_compile_message)" :disabled="!item.infra_compile_message">
          <v-icon>mdi-transit-connection</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination v-model="page" :length="pageCount" :total-visible="5" class="my-3" />

    <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" width="500">
      <div class="pa-4 bg-color-12">
        <p dir="ltr">
          {{ detail }}
        </p>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import SubmissionStatus from './SubmissionStatus';
import LanguageIcon from './LanguageIcon';
import { CHANGE_FINAL_SUBMISSION } from '../../../api';
import { mapState } from 'vuex';
import DateTimeFormatter from '../../DateTimeFormatter';
export default {
  components: { DateTimeFormatter, LanguageIcon, SubmissionStatus },
  props: {
    submissions: {
      type: Array,
    },
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t('dashboard.changeFinalSubmission'),
          sortable: false,
          value: 'is_final',
          align: 'right',
        },
        { text: this.$t('dashboard.submitTime'), sortable: true, value: 'submit_time', align: 'center' },
        { text: this.$t('form.language'), sortable: false, value: 'language', align: 'center' },
        { text: this.$t('dashboard.status'), sortable: false, value: 'status', align: 'center' },
        { text: this.$t('form.file'), sortable: false, value: 'file', align: 'center', width: 70 },
        { text: 'جزییات', sortable: false, value: 'log', align: 'center' },
      ];
    },
  },
  data() {
    return {
      dialog: false,
      detail: '',
      page: 1,
      pageCount: 0,
    };
  },
  methods: {
    async changeFinal(item) {
      if (item.is_final) return;
      let data = await this.$axios.$put(`${CHANGE_FINAL_SUBMISSION.url}/${item.id}`);
      if (data.status_code === 200) {
        this.$store.dispatch('team/getSubmissions');
        this.$toast.success('ارسال نهایی با موفقیت تغییر کرد.');
        this.submissions.map(el => {
          el.is_final = false;
        });
        console.log(this.submissions);
        item.is_final = true;
      } else if (data.status_code === 406) {
        this.$toast.error('کد هنوز کامپال نشده است.');
      }
    },
    onDetailClick(text) {
      this.dialog = true;
      this.detail = text;
    },
  },
};
</script>

<style scoped></style>
