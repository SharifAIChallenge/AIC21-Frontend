<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="ticket.title"
      :counter="30"
      :rules="[v => !!v || 'موضوع نمی تواند خالی باشد!', v => (v && v.length <= 30) || 'موضوع نمی تواند بیشتر از 30 کاراکتر باشد!']"
      label="موضوع"
      required
      outlined
      class="pa-2"
    ></v-text-field>

    <v-select
      v-model="ticket.tag"
      :items="tagItems"
      :rules="[v => !!v || 'نمی تواند خالی باشد!']"
      label="تگ مربوطه"
      required
      outlined
      class="pa-2"
    ></v-select>

    <v-textarea
      v-model="ticket.text"
      :counter="500"
      :rules="[v => !!v || 'متن نمی تواند خالی باشد!']"
      label="متن تیکت"
      required
      outlined
      class="pa-2"
    ></v-textarea>
    <v-btn color="primary" :disabled="!valid" class="mr-4" @click="created(ticket)">
      ارسال
    </v-btn>
  </v-form>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      valid: true,
      ticket: {
        tag: null,
        title: '',
        text: '',
        html: 'ddd',
      },
      tagItems: ['7c37a111-f84c-411c-8514-2cee42a05331', 'Item 2', 'Item 3', 'Item 4'],
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
      const response = await this.$axios.$post('https://api-stg.aichallenge.ir/api/ticket/', answer);
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      console.log(response);
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
