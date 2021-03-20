<template>
  <div>
    <div class="mb-4">
      <h2>

      <v-icon color="primary" size="36">mdi-alert-circle-outline</v-icon>
       ایجاد تیکت
      </h2>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="ticket.title"
        :counter="30"
        :rules="[v => !!v || 'عنوان نمی تواند خالی باشد!', v => (v && v.length <= 30) || 'عنوان نمی تواند بیشتر از 30 کاراکتر باشد!']"
        label="عنوان"
        required
        outlined
        class="pa-2"
      ></v-text-field>

      <v-textarea
        v-model="ticket.text"
        :counter="500"
        :rules="[v => !!v || 'شرح نمی تواند خالی باشد!']"
        label="شرح"
        required
        outlined
        class="pa-2"
      ></v-textarea>
      <v-chip-group mandatory active-class="primary--text" v-model="ticket.tag">
        <v-chip v-for="tag in tags" :key="tag">
          {{ tag }}
        </v-chip>
      </v-chip-group>
      <div style="display: flex; justify-content: flex-end;">
        <v-btn color="primary" :disabled="!valid" class="" @click="created(ticket)">
          + ایجاد
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      valid: true,
      ticket: {
        tag: '',
        title: '',
        text: '',
        html: 'ddd',
      },
      tags: ['بارگذاری کد'],
      tagsId: ['12d94eab-ce91-4d31-8238-e575b013b4da'],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    async created(answer) {
      console.log(answer);
      console.log('dddddddddddd');
      console.log(this.tagsId[answer.tag]);
      // const response = await this.$axios.$post('https://api-stg.aichallenge.ir/api/ticket/', answer);
      // this.$refs.form.reset();
      // this.$refs.form.resetValidation();
      // console.log(response);
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
