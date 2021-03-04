<template>
  <div>
    <label>
      name
      <input type="text" name="name" id="name" v-model="name" />
    </label>
    <label>
      file
      <input type="file" id="file" @change="handleFileUpload" accept="image/*" />
    </label>
    <button @click="submitTeam()">submit</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      image: '',
    };
  },
  methods: {
    handleFileUpload(e) {
      const selectedImage = e.target.files[0];
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = e => {
        this.image = e.target.result;
      };
      reader.readAsBinaryString(fileObject);
    },
    submitTeam() {
      let formData = new FormData();
      console.log(this.name);
      formData.append('name', this.name);
      if (this.image != null) {
        formData.append('image', this.image);
      }
      console.log(this.image);
      this.$axios.$post('team/', formData).then(res => {
        console.log(res);
      });
    },
  },
};
</script>
