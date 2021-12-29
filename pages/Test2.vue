<template>
  <div class='mt-15'>
    <v-btn color="primary" @click='showModal'>
      Click
    </v-btn>
      <v-dialog v-model='show' width='400px'>
        <Confirm />
      </v-dialog>
  </div>
</template>

<script>
import Confirm from '~/components/Confirm';
export default{
  components: {Confirm},
  data() {
    return{
    show: false,
  }
  },
  methods: {
    showModal() {
      this.show=!this.show;
    }
  }
}
</script>

<style scoped>

</style>