<template>
  <v-container class="mt-16">
    <div style="display: flex; justify-content:space-between ;">
      <div class="mb-4">
        <h2>
          <v-icon color="primary" size="36">mdi-alert-circle-outline</v-icon>
          {{ data.title }}
        </h2>
      </div>
      <div>
        <v-chip>
          {{ data.tag.title }}
        </v-chip>
      </div>
    </div>
    <div>
      <v-timeline dense>
        <v-timeline-item>
          <v-avatar slot="icon">
            <img :src="data.author.profile.image_link" />
          </v-avatar>
          <v-card>
            <v-card-text>
              {{ data.text }}
            </v-card-text>
          </v-card>
        </v-timeline-item>

        <v-timeline-item v-for="(reply, index) in data.replies" :key="index">
          <template v-slot:icon>
            <v-avatar>
              <img :src="reply.user.profile.image_link" />
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
            <img :src="data.author.profile.image_link" />
          </v-avatar>
          <v-card class="elevation-2">
            <v-form ref="form" lazy-validation class="pa-2">
              <v-textarea
                v-model="text"
                :counter="500"
                :rules="[v => !!v || 'شرح نمی تواند خالی باشد!']"
                label="نظر"
                required
                outlined
                class="pa-2"
              ></v-textarea>

              <div style="display: flex; justify-content: flex-end;">
                <v-btn color="primary" @click="sendReplay(data.id, text)">
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
  async asyncData({ route, $axios }) {
    var slug = route.params.slug;
    let res = await $axios.$get(`ticket/${slug}`);
    const { data, status_code } = res;
    return { data, status_code };
  },
  data() {
    return {
      text: '',
      data: {},
      status_code: 200,
    };
  },
  methods: {
    sendReplay(id, text) {
      this.$axios.$post(`ticket/${id}/replies`, { text }).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('نظر ارسال شد!');
          this.$axios.$get(`ticket/${id}`);
        } else {
          this.$toast.error('مشکلی در ارسال پیش آمده است!');
        }
      });
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
