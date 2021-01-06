<template>
  <div>
    <div class="wrapper">
      <div v-if="mode === 'chat'">
        <h1>
          {{ title }}
        </h1>
        <v-btn @click="goBack">
          back
        </v-btn>
        <h3>chat with {{ contact }}</h3>
        <div v-for="(msg, index) in msgs" :key="index">
          {{ msg.text }}
        </div>
        <v-text-field solo type="text" v-model="input" @keydown.enter="sendmsg" />
        <v-btn @click="sendmsg">send</v-btn>
        <h3>{{ input }}</h3>

        <hr />
      </div>

      <div v-else>
        <div v-for="user in contacts" :key="user.id" @click="onContactClick(user.username)">
          {{ user.username }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  auth: false,
  data() {
    return {
      title: 'chatbox',
      msgs: [
        {
          text: 'hello',
        },
        {
          text: 'hello',
        },
        {
          text: 'hello hesam',
        },
        {
          text: 'adsfassad',
        },
      ],
      input: '',
      contact: 'ali',
      mode: 'list',
      contacts: [
        {
          id: 1,
          username: 'ali',
        },
        {
          id: 2,
          username: 'ali reza',
        },
        {
          id: 3,
          username: 'ali2',
        },
        {
          id: 4,
          username: 'ali3',
        },
      ],
    };
  },
  methods: {
    sendmsg() {
      this.msgs.push({ text: this.input });
      this.input = '';
    },
    onContactClick(username) {
      this.contact = username;
      this.mode = 'chat';
    },
    goBack() {
      this.mode = 'list';
    },
  },
};
</script>

<style>
.wrapper {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
</style>
