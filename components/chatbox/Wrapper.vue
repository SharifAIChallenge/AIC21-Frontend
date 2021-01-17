<template>
  <div class="chat-main">
    <!-- <div>{{ title }}</div> -->
    <div v-if="chatmode">
      <ChatList :userContacts="user"  @changer="modeChanger" />
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
      userInChat: '',
      user: [],
      namee: '',
      //[
      //     {
      //       name: 'حسام',
      //       email: 'hessamasna@yahoo.com',
      //       contacts: [
      //         {
      //           name: 'ادمین',
      //           msg: [
      //             {
      //               sender: 'ادمین',
      //               text: 'admin test',
      //             },
      //             {
      //               sender: 'حسام',
      //               text: 'player text',
      //             },
      //           ],
      //         },
      //         {
      //           name: 'تیم',
      //           msg: [
      //             {
      //               sender: 'تیم',
      //               text: 'team test',
      //             },
      //             {
      //               sender: 'حسام',
      //               text: 'player text',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
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
    setUserInchat() {},
    definder(name) {
        console.log(name)
      this.namee = name;
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
  bottom: 0px;
}
.submit-start1 {
margin-bottom: 5px;
position: absolute;
  text-align: center;
  bottom: 0px;
  width: 90%;
  right: 20px;
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
.contact-list {
  font-size: 15px;
  font-weight: bold;
  padding: 5px 0px 5px 0px;
  margin: 10px 0 0 0;
  border-style: solid;
  border-radius: 20px;
  cursor: pointer;
}

</style>