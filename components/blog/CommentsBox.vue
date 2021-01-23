<template>
  <div>
    <div v-for="(comment, i) in comments" :key="i">
      <h3>{{ comment.author }}</h3>
      <p>{{ comment.text }}</p>
      <p>
        <i>{{ comment.time }}</i>
      </p>
      <v-row align="center" justify="center">
        <button>like</button>
        <button>dislike</button>
        <button @click="replyInput === false ? (replyInput = i) : (replyInput = false)">reply</button>
      </v-row>
      <input
        v-if="i === replyInput"
        placeholder="add your reply"
        style="background-color: red"
        v-model="reply"
        @keydown.prevent.enter="addReply(i)"
        @keydown.esc="replyInput = false"
      />
      <br />
      <div v-for="(reply, i) in comment.reply" :key="i">
        {{ reply.text }}
      </div>
    <hr>
    </div>
  </div>
</template>
<script>
export default {
  props: ['comments'],
  data() {
    console.log(this.comments);
    return {
      replyInput: false,
      reply: '',
    };
  },
  methods: {
    addReply(i) {
      this.comments[i].reply.push({ text: this.reply });
      this.replyInput = false;
      this.reply = '';
    },
  },
};
</script>
<style>
</style>