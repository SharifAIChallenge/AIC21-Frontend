<template>
  <div class="chat-main">
      <div>{{title}}</div>
    <div  v-if="chatmode">
      <ChatList :userContacts="user" @changer="modeChanger" />
    </div>
    <div v-else>
      <MessageList :userData="user" @changer="modeChanger" />
    </div>
  </div>
</template>

<script>
import ChatList from './ChatList';
import MessageList from './MessageList';

export default {
  auth: false,

  components: { MessageList, ChatList },
  data() {
    return {
      chatmode: true,
      title: 'گفتگو آنلاین',
      user: [
        {
          name: 'حسام',
          email: 'hessamasna@yahoo.com',
          msg: [
            { sender: 'حسام', text: 'سلام میخواستم بدونم که ..................' },
            { sender: 'ادمین', text: 'اره داداش رواله 😂' },
          ],
        },
        {
          name: 'داداشم محمد',
          email: 'mamad@yahoo.com',
          msg: [
            { sender: 'داداشم محمد', text: 'سلام میخواستم بدونم که ..................' },
            { sender: 'ادمین', text: 'اره داداش رواله 😂' },
          ],
        },
      ],
    };
  },
  methods: {
    modeChanger() {
      this.chatmode = !this.chatmode;
    },
    addContact() {
      if (this.email && this.name) {
        return;
      }
      this.user.push({ name: this.name, email: this.email, msg: [{ sender: 'ادمین', text: 'خوش آمدید' }] });
      this.email = '';
      this.name = '';
      modeChanger();
    },
  },
};
</script>

<style>
.chat-main {
  text-align: center;
  max-width: 600px;
  margin: 30px auto;
}
.submit-start {
  text-align: center;
  width: 80%;
  margin-top: 10px;
}
.submit-start1 {
  text-align: center;
  width: 80%;
}
.email-start {
}
.login {
  margin: 35px;
}
.name {
  margin: 5%;
  padding: 5px;
  border-style: solid;
  border-radius: 100px;
  border-color: #ff0000;
}
.sender {
  margin: 10px;
  text-align: right;
  background-color: rgba(160, 211, 18, 0.49);
  border-radius: 20px;
  padding-bottom: 20px;
  width: 70%;
}
.admin {
  margin: 10px;
  text-align: left;
  background-color: rgba(211, 18, 18, 0.49);
  border-radius: 20px;
  padding-bottom: 20px;
  width: 70%;
  margin-right: 30%;
}
.icon {
  padding: 10px 10px 0px 10px;
}
</style>