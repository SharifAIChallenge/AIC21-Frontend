<template>
  <v-container>
    <!-- {{ dataa }} -->
    <!-- {{currentUserProfile}} -->
    <!-- {{ profile }} -->
    
    <div>
      <div class="tickets-countainer">
        <div class="ticket-main-info">

        <div class="ticket-main-info-title">{{ data.title }}</div>
        <div class="ticket-main-info-date">در تاریخ: {{ fixDate(data.created) }} در ساعت: {{ fixTime(data.created) }}</div>
        <div class="ticket-main-info-text">{{data.text}}</div>
        <div class="ticket-main-info-status">{{data.status}}</div>
        <div class="ticket-main-info-answer-status">{{lastStatusOfReply()}}</div>
        <div class="ticket-main-info-public">{{data.is_public}}</div>
        </div>
        <div v-for="(reply, index) in data.replies" :key="index">
          <div v-if="currentUserEmail === reply.user.email" class="user-reply">
            {{ index }}.
            <div class="user-reply-name">{{ reply.user.first_name }} {{ reply.user.last_name }}</div>
            <div class="user-reply-date">در تاریخ: {{ fixDate(reply.created) }} در ساعت: {{ fixTime(reply.created) }}</div>
            <div class="user-reply-text">
              {{ reply.text }}
            </div>
          </div>
          <div v-else class="admin-reply">
            {{ index }}.
            <div class="admin-reply-name">{{ reply.user.first_name }} {{ reply.user.last_name }}</div>
            <div class="admin-reply-date">در تاریخ: {{ fixDate(reply.created) }} در ساعت: {{ fixTime(reply.created) }}</div>
            <div class="admin-reply-text">
              {{ reply.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  // auth:false,
  async fetch() {
    this.currentUserProfile = this.$auth.user.profile;
    // console.log(this.$auth.user.profile);
    this.currentUserEmail = this.$auth.user.email;
    // console.log(this.$auth.user.email);
    // this.$axios.$get('homepage/media').then(res => console.log(res));
  },
  data() {
    return {
      currentUserProfile: {},
      currentUserEmail: '',
      data: {
        author: {
          first_name: 'حسام',
          last_name: 'اثنی عشری',
          email: 'a@b.com',
        },
        replies: [
          {
            user: {
              first_name: 'حسام',
              last_name: 'اثنی عشری',
              email: 'a@b.com',
            },
            text: 'qwsxszs',
            created: '2021-02-27T17:52:05.932809Z',
            status: 'pending',
            id: '9b3d1e96-fffd-492f-a39e-9ce9b65f2b32',
          },          {
            user: {
              first_name: 'ادمین',
              last_name: 'ادمینی',
              email: 'a1@b1.com',
            },
            text: 'سلام عزیز چرت نوشتی',
            created: '2021-03-27T19:52:05.932809Z',
            status: 'answered',
            id: '9b3d1e96-fffd-492f-a39e-wwwwwwwwwww',
          },
        ],
        num_replies: 1,
        created: '2021-02-27T17:47:56.639131Z',
        tag: 'dba4ca82-81e9-4c91-ac86-718e9dc8fe7b',
        id: 'e0b830fa-46e2-4b60-8a43-5b502d3f85b7',
        title: 'sdsdxsdx',
        text: 'dxdxdx',
        html: 'ddd',
        status: 'open',
        is_public: false,
      },
      status_code: 200,
    };
  },
  async asyncData({ $axios, params }) {
    const id = await params.slug;
    const dataa = await $axios.$get(`/ticket/${id}`);
    // const profile = this.$auth.user.profile;
    return {
      dataa,
      // profile
    };
  },
  methods: {
    fixDate(created) {
      var str = created;
      return str.substring(0, 10);
    },
    fixTime(created) {
      var str = created;
      return str.substring(11, 19);
    },
    lastStatusOfReply(){
      let lastElementStatus = this.data.replies[this.data.replies.length-1];
      return lastElementStatus.status;
    },
  },
};
</script>

<style>
.user-reply {
  color: red;
}
.admin-reply {
  color: green;
}
.tickets-countainer {
  padding: 20px;
  margin-top: 80px;
}
</style>
