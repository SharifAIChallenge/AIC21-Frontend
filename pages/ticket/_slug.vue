<template>
  <v-container>
    <div style="display: flex; justify-content:space-between ;">
      <div class="mb-4">
        <h2>
          <v-icon color="primary" size="36">mdi-alert-circle-outline</v-icon>
          {{ this.data.title }}
        </h2>
      </div>
      <div>
        <v-chip>
          بارگذاری کد
        </v-chip>
      </div>
    </div>
    <div>
      <v-timeline dense>
        <v-timeline-item>
          <v-avatar slot="icon">
            <img :src="this.data.author.image" />
          </v-avatar>
          <v-card>
            <v-card-text>
              {{ this.data.text }}
            </v-card-text>
          </v-card>
        </v-timeline-item>

        <v-timeline-item v-for="(reply, index) in this.data.replies" :key="index">
          <template v-slot:icon>
            <v-avatar>
              <img :src="reply.user.image" />
            </v-avatar>
          </template>
          <v-card class="elevation-2">
            <v-card-text>
              {{ reply.text }}
            </v-card-text>
          </v-card>
        </v-timeline-item>

        <v-timeline-item>
          <v-avatar slot="icon">
            <img :src="this.data.author.image" />
          </v-avatar>
          <v-card class="elevation-2">
            <v-form ref="form" lazy-validation class="pa-2">
              <v-textarea
                :counter="500"
                :rules="[v => !!v || 'شرح نمی تواند خالی باشد!']"
                label="نظر"
                required
                outlined
                class="pa-2"
              ></v-textarea>

              <div style="display: flex; justify-content: flex-end;">
                <v-btn color="primary">
                  ارسال نظر
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-timeline-item>
      </v-timeline>
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
          image: 'https://i.pravatar.cc/64',
        },
        replies: [
          {
            user: {
              first_name: 'حسام',
              last_name: 'اثنی عشری',
              email: 'a@b.com',
              image: 'https://i.pravatar.cc/64',
            },
            text: 'qwsxszs',
            created: '2021-02-27T17:52:05.932809Z',
            status: 'pending',
            id: '9b3d1e96-fffd-492f-a39e-9ce9b65f2b32',
          },
          {
            user: {
              first_name: 'ادمین',
              last_name: 'ادمینی',
              email: 'a1@b1.com',
              image: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/nun_sister_woman_avatar-512.png',
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
    lastStatusOfReply() {
      let lastElementStatus = this.data.replies[this.data.replies.length - 1];
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
