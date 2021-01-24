<template>
  <div>
    <div v-for="(comment, i) in comments" :key="i">
      <h3>{{ comment.author }}</h3>
      <p>{{ comment.text }}</p>
      <p>
        <i>{{ comment.time }}</i>
      </p>
      <v-row class="comment-btn-box" align="center" justify="end">
        <v-btn class="comment-btn" icon color="red">
          <v-icon>mdi-thumb-down</v-icon>
        </v-btn>
        <v-btn class="comment-btn" icon color="green">
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        <v-btn class="comment-btn" @click="replyInput === false ? (replyInput = i) : (replyInput = false)">reply</v-btn>
      </v-row>
      <br />
      <v-text-field
        solo
        v-if="i === replyInput"
        placeholder="add your reply"
        v-model="reply"
        @keydown.prevent.enter="addReply(i)"
        @keydown.esc="replyInput = false"
      ></v-text-field>
      <div class="reply-box" v-for="(reply, i) in comment.reply" :key="i">
        {{ reply.text }}
      </div>
      <hr />
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
<style scoped>
.reply-box {
  margin-right: 4vw;
  margin-bottom: 4px;
  padding-bottom: 0.7vw;
  padding-right: 7px;
  border-right: solid #38007d 7px;
}
.comment-btn-box{
    margin-left: 3vw;
}
.comment-btn{
    margin:7px
}
</style>
