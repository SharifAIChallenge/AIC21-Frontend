<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <v-form>
        <v-container>
          <v-row>
            <v-col md="6">
              <v-text-field v-model="name" :counter="20" label="نام" required outlined></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field v-model="email" label="ایمیل" required outlined></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-btn elevation="15" class="submit-start" @click="addContact()">آغاز گفتگو</v-btn>
      <div v-for="(userContact,index) in this.userContacts" :key="index">
        
      </div>
      <!-- <div class="login">
        <v-text-field v-model="emailLogin" label="ایمیل" outlined class="email-start"></v-text-field>
        <v-btn elevation="15" class="submit-start1" @click="findEmail()">بازگشت به گفتگو قبل</v-btn>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  props: ['userContacts'],
  data() {
    return {
      title: 'شروع گفتگو آنلاین',
      email: '',
      // emailLogin: '',
      name: '',
    };
  },
  methods: {
    addContact() {
      if (this.email === '' || this.name === '') {
        return;
      }
      this.userContacts.push({ name: this.name, email: this.email, msg: [{ sender: 'ادمین', text: 'خوش آمدید' }] });
      this.email = '';
      this.name = '';
      this.$emit('changer');
    },
    // findEmail() {
    //   this.emailLogin = '';
    // },
    // changeMode() {
    //   this.$emit('changer');
    // },
  },
};
</script>

<style>
</style>