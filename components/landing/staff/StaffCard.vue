<template>
  <div class="staff_card d-inline-block" style="max-width:350px;min-width:290px">
    <div class="staff_img grey darken-3" style="margin:24px auto;height:230px;width:230px">
      <img src="" alt="staff image" width="100%" height="100%" style="object-fit: cover;" />
    </div>
    <div class="staff_intro pb-4" style="width:230px; margin:5px auto;">
      <div class="font-weight-bold white--text">
        پسر خوب
      </div>
      <div class="text-caption text-start" style="margin-top:12px">
        برنامه نویس فرانت اند
      </div>
    </div>
    <div class="primary py-1 text-center white--text font-weight-black">
      فنی
    </div>
  </div>
</template>

<style scoped>
.staff_card {
  width: 100%;
  border: 2px solid var(--v-primary-base);
}
.staff_intro,
.staff_img {
  width: calc(100% - 40px);
  margin: 24px 20px;
}
</style>
