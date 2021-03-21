<template>
  <div class="staff_card">
    <div class="staff_img grey darken-3" style="margin:24px 0;height:230px;width:230px;position:relative">
      <a :href="staff.url" target="_blank">
        <img :src="staff.image" alt="staff image" width="100%" height="100%" style="object-fit: cover; " />
      </a>
      <div class="primary py-1 text-center white--text font-weight-black" style="position:absolute;width:40%;left:0;bottom:20px">
        {{ staff.group_title }}
      </div>
    </div>
    <div class="staff_intro pb-4" style="width:230px; margin:5px 0;">
      <div class="font-weight-bold white--text">{{ staff.first_name_fa }} {{ staff.last_name_fa }}</div>
      <div class="text-caption text-start primary--text" style="margin-top:12px;">
        {{ staff.team_title && staff.team_title }}
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
  max-width: 300px;
  width: 100%;
}
.staff_intro,
.staff_img {
  width: calc(100% - 40px);
  margin: 24px 20px;
}

@media screen and (max-width: 768px) {
  .staff_img img {
    filter: none !important;
  }
}
.staff_img img {
  filter: grayscale();
  transition: filter 0.7s;
}
.staff_img img:hover {
  filter: none;
}
</style>
