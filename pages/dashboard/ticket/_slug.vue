<template>
  <SectionContainer  class="mr-0 pr-0">
    <div style="display: flex; justify-content:space-between ;">
      <div class="mb-4">
        <h2>
          <v-icon color="primary" size="36" class="pr-6 pl-2">mdi-alert-circle-outline</v-icon>
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
      <v-timeline dense >
        <v-timeline-item  >
          <v-avatar slot="icon">
            <img :src="data.author.profile.image_link" />
          </v-avatar>
          <div class="repliy-bg-color pa-3">
            <Preview :comment="data.text" />
          </div>
        </v-timeline-item>

        <v-timeline-item v-for="(reply, index) in data.replies" :key="index">
          <template v-slot:icon>
            <v-avatar>
              <img :src="reply.user.profile.image_link" />
            </v-avatar>
          </template>
          <div class="repliy-bg-color pa-3">
            <Preview :comment="reply.text" />
          </div>
        </v-timeline-item>

        <v-timeline-item>
          <v-avatar slot="icon">
            <img :src="data.author.profile.image_link" />
          </v-avatar>
          <div class="repliy-bg-color">
            <v-form ref="form" lazy-validation class="pa-2">
              <!-- <v-textarea
                v-model="text"
                :counter="500"
                :rules="[v => !!v || 'شرح نمی تواند خالی باشد!']"
                label="نظر"
                required
                outlined
              ></v-textarea> -->

              <Editor @update="updateText" class="pt-2 pb-8" />

              <div style="display: flex; justify-content: flex-end;">
                <div style="max-width: 300px; width: 100%">
                  <v-btn block color="primary" @click="sendReplay(data.id, text)">
                    <v-icon class="ml-3">
                      mdi-telegram
                    </v-icon>

                    <span>
                      ارسال نظر
                    </span>
                  </v-btn>
                </div>
              </div>
            </v-form>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
  </SectionContainer>
</template>

<script>
import Preview from '~/components/editor/Preview';
import Editor from '~/components/editor/Editor';
import SectionContainer from '~/components/SectionContainer';
export default {
  layout: 'dashboard',
  components: { Preview, Editor, SectionContainer },
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
    updateText(val) {
      this.text = val;
    },
    sendReplay(id, text) {
      this.$axios.$post(`ticket/${id}/replies`, { text }).then(res => {
        if (res.status_code === 200) {
          this.$toast.success('نظر ارسال شد!');
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.$axios.$get(`ticket/${id}`).then(res => {
            this.data = res.data;
            this.status_code = res.status_code;
          });
        } else {
          this.$toast.error('مشکلی در ارسال پیش آمده است!');
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import 'assets/variables.scss';
.user-reply {
  color: red;
}
.admin-reply {
  color: green;
}
.tickets-countainer {
  margin-top: 80px;
}
.repliy-bg-color {
  background: map-get($material-dark-elevation-colors, '12') !important;
}
</style>
