<template>
  <div>
    <div class="techDiv">
      <h1 class="text-right">فنی</h1>
      <div class="text-left">
        <span class="px-5">گرافیک</span>
        <span class="px-5">سایت</span>
        <span class="px-5">زیرساخت</span>
        <span class="px-5">سرور و کلاینت</span>
      </div>
    </div>
    <!-- <TechTeam /> -->
    <div class="marketing mt-15">
      <h1 class="text-right">برندینگ</h1>
      <div class="text-left">
        <span class="px-5">محتوا</span>
        <span class="px-5">مدیا</span>
      </div>
    </div>
  </div>
</template>
<script>
import TechTeam from './TechTeam';
export default {
  props: ['staffs'],
  data() {
    return {
      techStaff: [],
    };
  },
  components: {
    TechTeam,
  },
  methods: {},
  mounted() {
    for (var prop in this.staffs) {
      this.techStaff.push(this.staffs.tech)
      console.log(this.techStaff)
    }
  },
};
</script>
<style lang="scss" scoped>
.techDiv,
.marketing {
  height: 10vw;
  display: flex;
  align-items: center;
  background-color: var(--v-primary-base);
  h1 {
    justify-content: flex-start;
    text-align: right;
    margin: auto;
    font-size: 3rem;
  }
  div {
    text-align: left;
    justify-content: left;
    margin: auto;
  }
}
</style>
