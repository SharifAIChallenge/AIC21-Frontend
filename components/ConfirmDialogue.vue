<template>
  <div>
    <v-dialog class='modal' v-model='show' width='400px'>
      <div class='question '>
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
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  props: ['text'],
  data() {
    return {
      show: true,
    };
  },
  methods: {
    confirm() {
      this.$emit('confirmation');
      this.show = false;
    },
    reject() {
      this.show = false;
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
  font-size: 1.5rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>