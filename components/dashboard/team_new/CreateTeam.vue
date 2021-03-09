<template>
  <div>
    <h2>
      <v-icon x-large color="primary">
        mdi-account-multiple-plus-outline
      </v-icon>
      ساختن تیم
    </h2>
    <v-alert color="black" dark icon="mdi-information" width="50%" dense>
      پس ازاینکه همه ی اعضای تیم در سایت ثبت ‌نام کردند،کافی است یک نفر تیم بسازد و بقیه اعضا را به آن دعوت کند.
    </v-alert>
    <div class="input">
      <div class="fileInput secondary">
        <v-file-input
          class="mb-5"
          hide-input
          v-model="image"
          :label="$t('form.file')"
          prepend-icon="mdi-image-plus"
          show-size
        ></v-file-input>
      </div>
      <!-- <input type="file" id="file" @change="handleFileUpload" accept="image/*" /> -->
      <v-text-field label="نام تیم" outlined v-model="name"></v-text-field>
      <div class="buttons">
        <v-btn tile class="black" @click="forfiet()">لغو</v-btn>
        <v-btn tile @click="submitTeam()" class="primary submitBtn">
          <v-icon>
            mdi-plus-circle-outline
          </v-icon>
          تیمم را بساز
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      image: null,
    };
  },
  methods: {
    submitTeam() {
      const formData = new FormData();
      formData.append('name', this.name);
      if (this.image != null) {
        formData.append('image', this.image);
      }

      // observe formdate object
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      this.$axios.$post('team/', formData, { headers: { 'content-type': 'multipart/form-data' } }).then(res => {
        console.log(res);
      });
    },
    forfiet() {
      this.name = '';
      this.image = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  max-width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .fileInput {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    height: 15vh;
    margin-left: auto;
    margin-right: auto;
    .v-file-input {
      display: flex;
      justify-content: center;
    }
  }
  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .submitBtn {
      text-align: center;
      width: 80%;
      margin-right: auto;
    }
  }
}
</style>
