<template>
  <div class="staff_card">
      <div class="staff_img grey darken-3" style="margin-top:20px;height:185px">
          <img src="" alt="staff image" width="100%" height="100%">
      </div>
    <div class="staff_intro">
      <div class="font-weight-bold white--text">
        پسر خوب
      </div>
      <div class="py-1 text-caption text-start">
        برنامه نویس فرانت اند
      </div>
    </div>
    <div class="primary py-1 text-center white--text font-weight-bold">
      فنی
    </div>
  </div>
</template>

<style scoped>
.staff_card {
  width: 100%;
  border: 3px solid var(--v-primary-base);
}
.staff_intro,
.staff_img{
    width: calc(100% - 40px);
    margin: 10px 20px;
}
</style>
