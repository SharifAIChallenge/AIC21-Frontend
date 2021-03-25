<template>
  <div>
    <div class='modal'>
      <div class='question my-7'>
        آیا مطمئن هستید ؟
      </div>
      <div class='buttons my-7'>
        <div>
          <v-btn color='primary' block @click='decline'>
            خیر
          </v-btn>
        </div>
        <div>
          <v-btn color='primary' block @click='confirm'>
            بله
          </v-btn>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  methods: {
    confirm() {
      this.$emit('confirmation', true);
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
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
}

.buttons {
  display: flex;
  justify-content: space-around;
}
</style>