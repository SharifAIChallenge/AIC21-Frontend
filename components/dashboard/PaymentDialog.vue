<template>
  <v-dialog @click:outside="onClose" v-model="dialog" width="350">
    <div class="bg-color-12">
      <v-btn icon class="close-btn" @click="onClose">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
      <div class="pa-3 pb-8">
        <div class="text-h6">
          هم‌اکنون قابلیت پرداخت مرحله دوم به صفحه تیم اضافه شد
        </div>
        <div class="mt-5">
          برای پرداخت و اطلاعات بیشتر به صفحه
          <div class="link text-h6" @click="gotoTeam">
            تیم
          </div>

          مراجعه کنید
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog'],
  methods: {
    onClose() {
      localStorage.setItem('isSawDialog', true);
      this.dialog = false;
      this.$emit('close');
    },
    gotoTeam() {
      this.onClose();
      this.$router.push('/dashboard/team');
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  display: inline-block;
  color: var(--v-primary-base);
  font-weight: bold;
  cursor: pointer;
}
</style>
