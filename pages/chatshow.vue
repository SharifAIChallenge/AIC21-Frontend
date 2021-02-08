<template>
  <div>
    <div class="start-chat">
      <v-icon large color="white" class="btn-start-chat" @click="toggleChatMode">mdi-message-text</v-icon>
    </div>
    <div class="chat-mode">
      <Wrapper class="chat-area"/>
      <div class="title-chat">چت آنلاین</div>
    </div>
  </div>
</template>

<script>
import Wrapper from '../components/chatbox/Wrapper';

export default {
  auth: false,
  components: { Wrapper },
  data() {
    return {};
  },
  methods: {
    toggleChatMode() {
      document.querySelector('.chat-mode').classList.toggle('show-mode');
    },
  },
};
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.btn-start-chat {
  background: #ff5622d0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 5px #ff5722;

}
.start-chat {
  position: fixed;
  right: 50px;
  bottom: 170px;
}
.chat-mode {
  display: none;
  font-size: 1.75vh;
  position: fixed;
  bottom: 200px;
  right: 130px;
  height: 400px;
  width: 40%;
  max-width: 400px;
  min-width: 250px;
  background-color: darkmagenta;
  justify-content: space-between;
  padding: 0.75rem;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}
.show-mode {
  display: flex;
}
.chat-area{
    /* bottom: 0px; */
    height: 83%;
    width: 100%;
    margin: 15px 0 0apx 0;
    padding: 0px 10px 10px 10px ;
    overflow-y: auto;
    overflow-x: hidden;
    
}
.title-chat{
    text-align:center;
    position: absolute;

}
.sender{
    font-size: 1.5vh;
}
.admin{
    font-size: 1.5vh;
}
</style>