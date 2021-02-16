<template>
  <div>
    <div v-for="(user, index) in this.userData" :key="index">
      <!-- <div class="name">نام نمایشی: {{ user.name }} | ایمیل: {{ user.email }}</div> -->
      <div></div>
      <div v-for="(contact, index) in user.contacts" :key="index">
        <div v-if="contact.chat === true">
                <div>{{ user.name }} عزیز شما در حال چت با {{contact.name}} سایت هستید !</div>

          <div v-for="(msg, index) in contact.msg" :key="index">
            {{ msg.sender }}
            <div v-if="msg.sender === user.name" class="sender">
              <img src="user.png" alt="admin-favIcon" class="icon" />
              {{ msg.text }}
            </div>
            <div v-else class="admin">
              <div>
                {{ msg.text }}
                <img src="favicon.png" alt="admin-favIcon" class="icon" />
              </div>
            </div>
          </div>

          <div>(enter)فرستادن پیام از پلیر</div>
          <v-text-field label="پیام" v-model="textSendUser" solo @keypress.enter="sendUser(contact.msg, user.name)"></v-text-field>
          <div>(enter)فرستادن پیام از ادمین</div>
          <v-text-field label="پیام" v-model="textSendAdmin" solo @keypress.enter="sendAdmin(contact.msg, contact)"></v-text-field>
          <v-btn elevation="15" class="submit-start1" @click="contact.chat = false ,changeMode()">بازگشت</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import ChatList from './ChatList.vue'

export default {
  auth: false,

  // components: {
  //     ChatList
  // },
  props: ['userData'],
  data() {
    return {
      textSendUser: '',
      textSendAdmin: '',
      userInMessageList: this.userData,
    };
  },
  methods: {
    sendUser(msg, name) {
      if (this.text) {
        return;
      }
      msg.push({ sender: name, text: this.textSendUser });
      this.textSendUser = '';
    },
    sendAdmin(msg, contact) {
      if (this.text) {
        return;
      }
      msg.push({ sender: contact.name, text: this.textSendAdmin });
      this.textSendAdmin = '';
    },
    changeMode() {
      this.$emit('changer');
    },
  },
};
</script>

<style>
</style>