<template>
  <div>
    <SectionHeader title="ساختن تیم" icon="mdi-account-multiple-plus-outline" />
    <SectionContainer>
      <div class="create-team">
        <v-alert icon="mdi-information">
          پس ازاینکه همه ی اعضای تیم در سایت ثبت ‌نام کردند،کافی است یک نفر تیم بسازد و بقیه اعضا را به آن دعوت کند.
        </v-alert>
        <div class="d-flex justify-center my-8 my-md-16">
          <div class="secondary fileInput" @click="getImage">
            <v-file-input
              ref="file"
              hide-input
              v-model="image"
              :label="$t('form.file')"
              prepend-icon="mdi-image-plus"
              show-size
            ></v-file-input>
          </div>
        </div>
        <!-- <input type="file" id="file" @change="handleFileUpload" accept="image/*" /> -->
        <v-text-field label="نام تیم" outlined v-model="name"></v-text-field>
      </div>
      <div class="d-flex">
        <div style="flex: 0 1 93px; margin-left: 24px">
          <v-btn block class="black" @click="forfiet()">لغو</v-btn>
        </div>
        <div style="flex: 1">
          <v-btn block :loading="loading" @click="submitTeam()" color="primary" class="">
            <v-icon class="ml-3">mdi-plus-circle-outline</v-icon>
            تیمم را بساز
          </v-btn>
        </div>
      </div>
    </SectionContainer>
  </div>
</template>
<script>
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';

export default {
  props: ['toggleHaveTeam'],
  components: { SectionHeader, SectionContainer },
  data() {
    return {
      name: '',
      image: null,
      loading: false,
    };
  },
  methods: {
    submitTeam() {
      if (!this.name) {
        this.$toast.error('اسم تیم نمی‌تواند خالی باشد');
        return;
      }
      const formData = new FormData();
      formData.append('name', this.name);
      if (this.image != null) {
        formData.append('image', this.image);
      }
      this.loading = true;
      this.$axios.$post('team/', formData, { headers: { 'content-type': 'multipart/form-data' } }).then(res => {
        this.loading = false;
        if (res.status_code === 200) {
          this.$toast.success('تیم شما با موفقیت ساخته‌شد');
          this.toggleHaveTeam();
        } else if (res.status_code === 400) {
          this.$toast.error('تیمی با این نام وجود دارد.');
          this.forfiet();
        } else {
          //TODO: check other errors and status code
          this.$toast.error('ساخت تیم با خطا مواجه شد');
          this.forfiet();
        }
      });
    },
    forfiet() {
      this.name = '';
      this.image = null;
    },
    getImage() {
      console.log(this.$refs.file);
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.team{
  margin: 0 !important;
}
.create-team {
  .v-input {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    .v-input__prepend-outer {
      margin: 0;
      width: 100%;
      height: 100%;
      .v-input__icon {
        width: 100%;
        height: 100%;
        button {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .fileInput {
    width: 15vh;
    height: 15vh;
    .v-file-input {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
