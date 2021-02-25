<template>
  <div class="staff_card d-inline-block" style="max-width:350px;min-width:290px">
    <v-container>
      <div class="staff_img grey darken-3" style="margin-top:24px;height:185px">
        <img :src="staff.image" :alt="staff.url" width="100%" height="100%" />
      </div>
      <div class="staff_intro">
        <div class="font-weight-bold white--text">
          {{ staff.first_name_fa + ' ' + staff.last_name_fa }}
        </div>
        <div class="text-caption text-start" style="margin-top:12px">
          {{ staff.role }}
        </div>
      </div>
      <div class="primary py-1 text-center white--text font-weight-black">
        {{ staff.group_title }}
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['staff'],
};
</script>

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
