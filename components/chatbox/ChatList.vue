<template>
  <div>
    <div v-if="!this.start">
      <div>{{ title }}</div>
      <div>
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field v-model="name" :counter="20" label="نام" required outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="email" label="ایمیل" required outlined></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-btn elevation="15" class="submit-start" @click="addContact()">آغاز گفتگو</v-btn>
      </div>
    </div>

    <div v-else>
      <div>لیست چت ها</div>
      <div v-if="this.userContacts[0]">
        <div>{{ this.userContacts[0].name }} عزیز لطفا مخاطب خود را انتخاب کنید</div>
        <div v-for="(contact, index) in this.userContacts[0].contacts" :key="index">
          <div @click="chatdefinder(contact)" class="contact-list">{{ contact.name }}</div>
        </div>
        <!-- <v-btn elevation="15" class="submit-start" @click="backToStart()">بازگشت به شروع</v-btn> -->
      </div>
    </div>

    <!-- </div> -->
    <!-- <div v-for="(userContact,index) in this.userContacts" :key="index">
        {{userContact.name}}
      </div> -->
    <!-- <div class="login">
        <v-text-field v-model="emailLogin" label="ایمیل" outlined class="email-start"></v-text-field>
        <v-btn elevation="15" class="submit-start1" @click="findEmail()">بازگشت به گفتگو قبل</v-btn>
      </div> -->
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
      start: false,
    };
  },
  methods: {
    addContact() {
      if (this.email === '' || this.name === '') {
        return;
      }
      this.userContacts.push({
        name: this.name,
        email: this.email,
        contacts: [
          { chat: false, name: 'ادمین', msg: [{ sender: 'ادمین', text: 'admin test' }] },
          { chat: false, name: 'تیم', msg: [{ sender: 'تیم', text: 'admin test' }] },
        ],
      });
      this.email = '';
      this.name = '';
      this.start = true;
      // this.$emit('changer');
    },
    // findEmail() {
    //   this.emailLogin = '';
    // },
    changeMode() {
      this.$emit('changer');
    },
    backToStart() {
      this.start = !this.start;
      this.userContacts = [];
    },
    chatdefinder(contact) {
      contact.chat = true;
      this.$emit('changer');
    },
  },
};
</script>

<style>
</style>