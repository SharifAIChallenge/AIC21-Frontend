<template>
  <div>
    <label>
      name
      <input type="text" name="name" id="name" v-model="name" />
    </label>
    <!-- <input type="file" id="file" @change="handleFileUpload" accept="image/*" /> -->
    <v-file-input v-model="image" :label="$t('form.file')" show-size></v-file-input>
    <button @click="submitTeam()">submit</button>
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
  },
};
</script>
