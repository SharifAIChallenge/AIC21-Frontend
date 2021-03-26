<template>
  <div>
    <v-dialog v-model='showModal' width='400px' @click:outside='reject'>
      <div class='modal bg-color-12'>
        <div class='question mt-7 mx-7 '>
          {{ this.text }}
        </div>
        <div class='buttons mt-7'>
          <div>
            <v-btn color='black' block @click='reject' style='width: 200px'>
              خیر
            </v-btn>
          </div>
          <div>
            <v-btn color='primary' block @click='confirm' style='width: 200px'>
              بله
            </v-btn>
          </div>
        </div>
      </div>

    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  props: ['text', 'showModal'],
  data() {
    return {
      show: true,
    };
  },
  methods: {
    confirm() {
      this.$emit('confirmation');
      this.showModal = false;
    },
    reject() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang='scss'>
.modal {
  display: flex;
  flex-direction: column;
}

.question {
  text-align: center;
  font-weight: bold;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>