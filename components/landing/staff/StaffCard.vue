<template>
  <div class="staff_card">
    <div class="staff_img grey darken-3" style="margin:24px auto;height:230px;width:230px;position:relative">
      <img :src="`https://api-stg.aichallenge.ir/${staff.image}`" alt="staff image" width="100%" height="100%" style="object-fit: cover;" />
      <div class="primary py-1 text-center white--text font-weight-black" style="position:absolute;width:30%;left:0;bottom:20px">
        {{ staff.group_title }}
      </div>
    </div>
    <div class="staff_intro pb-4" style="width:230px; margin:5px auto;">
      <div class="font-weight-bold white--text">{{ staff.first_name_fa }} {{ staff.last_name_fa }}</div>
      <div class="text-caption text-start primary--text" style="margin-top:12px;">
        {{ staff.team_title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['staff'],
};
</script>
<style scoped>
.staff_card {
  max-width: 350px;
  min-width: 290px;
  width: 100%;
  /* border: 2px solid var(--v-primary-base); */
}
.staff_intro,
.staff_img {
  width: calc(100% - 40px);
  margin: 24px 20px;
}
</style>
