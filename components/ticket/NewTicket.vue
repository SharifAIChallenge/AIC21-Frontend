<template>
  <div>
    <div class="mb-2 mr-2">
      <h2>
        <v-icon color="primary" size="36">mdi-alert-circle-outline</v-icon>
        ایجاد تیکت
      </h2>
    </div>
    <v-form ref="form" class="pa-2" v-model="valid" lazy-validation>
      <v-text-field
        v-model="ticket.title"
        :counter="30"
        :rules="[v => !!v || 'عنوان نمی تواند خالی باشد!', v => (v && v.length <= 30) || 'عنوان نمی تواند بیشتر از 30 کاراکتر باشد!']"
        label="عنوان"
        required
        outlined
      ></v-text-field>

      <!-- <v-textarea
        v-model="ticket.text"
        :counter="500"
        :rules="[v => !!v || 'شرح نمی تواند خالی باشد!']"
        label="شرح"
        required
        outlined
        class="pa-2"
      ></v-textarea> -->

      <Editor @update="updateText" />

      <h5 class="mt-4">تگ مربوط به تیکت خود را انتخاب کنید!</h5>
      <div>
        <v-chip-group column active-class="primary--text" class="" v-model="ticket.tag">
          <v-chip v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </div>
      <div style="display: flex; justify-content: flex-end;" class="mt-6 ml-2">
        <v-btn color="primary" :disabled="!valid" class="mb-2" @click="created(ticket)" width="35%" :loading="loading">
          <v-icon class="ml-2">
            mdi-plus
          </v-icon>
          <span>
            ایجاد
          </span>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import Editor from '../editor/Editor';
export default {
  components: { Editor },
  props: ['toggleNewTicket'],
  async fetch() {
    this.loading = true;
    await this.$axios.$get('/ticket/tags').then(res => {
      if (res.status_code === 200) {
        this.data = res.data;
        this.status_code = res.status_code;
        this.tags = [];
        this.tagsId = [];
        this.data.forEach(item => {
          this.tags.push(item.title);
          this.tagsId.push(item.id);
        });
      } else {
        this.$toast.error('مشکلی در لود تگ ها به وجود آمده است!');
      }
    });
    this.loading = false;
  },
  data() {
    return {
      valid: true,
      loading: false,

      data: [],
      status_code: 200,
      ticket: {
        tag: '',
        title: '',
        text: '',
      },
      tags: [],
      tagsId: [],
    };
  },
  methods: {
    updateText(val) {
      this.ticket.text = val;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    async created(answer) {
      answer.html = answer.text;
      answer.tag = this.tagsId[answer.tag];
      this.$axios.$post('ticket/', answer).then(res => {
        if (res.status_code === 201) {
          this.$toast.success('تیکت شما ثبت شد!');
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.toggleNewTicket();
        } else {
          this.$toast.error('خطایی در ثبت تیکت به وجود آمد!');
        }
      });
    },
  },
};
</script>

<style>
.in {
  display: flex;
  justify-content: center;
}
</style>
