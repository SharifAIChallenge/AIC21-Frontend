<template>
  <div>
    <div v-for="(user, index) in this.userData" :key="index">
      <div class="name">نام نمایشی: {{ user.name }} | ایمیل: {{ user.email }}</div>
      <div>{{ user.name }} عزیز شما در حال چت با ادمین سایت هستید !</div>
      <div></div>
      <div v-for="(msg, index) in user.msg" :key="index">
        <div v-if="msg.sender === user.name" class="sender">
          <img src="user.png" alt="admin-favIcon" class="icon" />
          {{ msg.sender }} : {{ msg.text }}
        </div>
        <div v-else class="admin">
          <div>
            {{ msg.text }}
            <img src="favicon.png" alt="admin-favIcon" class="icon" />
          </div>
        </div>
      </div>
      <div>(enter)فرستادن پیام از پلیر</div>
      <v-text-field label="پیام" v-model="textSendUser" solo @keypress.enter="sendUser(user)"></v-text-field>
      <div>(enter)فرستادن پیام از ادمین</div>
      <v-text-field label="پیام" v-model="textSendAdmin" solo @keypress.enter="sendAdmin(user)"></v-text-field>
    </div>
          <v-btn elevation="15" class="submit-start1" @click="changeMode()">بازگشت</v-btn>

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
    sendUser(user) {
      if (this.text) {
        return;
      }
      user.msg.push({ sender: user.name, text: this.textSendUser });
      this.textSendUser = '';
    },
    sendAdmin(user) {
      if (this.text) {
        return;
      }
      user.msg.push({ sender: 'ادمین', text: this.textSendAdmin });
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