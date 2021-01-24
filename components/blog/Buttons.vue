<template>
  <div>
    <v-row align="center" justify="start">
      <v-btn icon :color="shareColor" @mouseover="shareColor = 'blue'" @mouseout="shareColor = 'gray'">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon :color="saveColor" @click="saveColor == '#5900c7' ? (saveColor = 'gray') : (saveColor = '#5900c7')">mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon :color="likeColor" @click="likeColor == 'pink' ? (likeColor = 'gray') : (likeColor = 'pink')">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      likeColor: 'gray',
      shareColor: 'gray',
      saveColor: 'gray',
    };
  },
};
</script>

<style scoped>
</style>