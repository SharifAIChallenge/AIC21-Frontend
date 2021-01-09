<template>
  <div>
    <div class="chat-main">
      <div class="title">{{ title }}</div>
      <div v-if="this.status === 'start'">
        <div v-for="(user, index) in user" :key="index">
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
        <v-btn elevation="15" class="submit-start1" @click="back()">بازگشت</v-btn>
      </div>
      <div v-else>
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
        <div class="login">
          <v-text-field v-model="emailLogin" label="ایمیل" outlined class="email-start"></v-text-field>
          <v-btn elevation="15" class="submit-start1" @click="findEmail()">بازگشت به گفتگو قبل</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  auth: false,
  data() {
    return {
      title: 'گفتگو آنلاین',
      status: 'login',
      email: '',
      emailLogin: '',
      name: '',
      textSendUser: '',
      textSendAdmin: '',
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
    addContact() {
      if (this.email === '' || this.name === '') {
        return;
      }
      // if (this.user.contacts(this.email)) {
      //     console.log("have");

      // }else{
      //     console.log("dont have");
      // }
      this.user.push({ name: this.name, email: this.email, msg: [{ sender: 'ادمین', text: 'خوش آمدید' }] });
      this.email = '';
      this.name = '';
      this.findEmail();
    },
    findEmail() {
      // this.emailLogin = '';
      this.status = 'start';
    },
    back() {
      this.status = 'login';
    },
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