<template>
  <div>
    <!-- <StaffPreview class="mr-10" v-for="group in groups" :key="group" :staffs="staffs[group]" /> -->

    <Header :staffs="allStaffs" />

    <div class="stickyBar">
      <div class="item" v-for="group in groups" :key="group">
        {{ group }}
      </div>
    </div>
    <StaffIntro v-for="(group, index) in groups" :key="group" :group="staffs[group]" :team="groups[index]" />
  </div>
</template>

<script>
import Header from '../components/staffs/Header';
import StaffIntro from '../components/staffs/StaffIntro';
import StaffPreview from '../components/staffs/StaffPreview';

export default {
  auth: false,
  data() {
    return {};
  },
  methods: {},
  components: {
    Header,
    StaffIntro,
    StaffPreview,
  },
  async asyncData({ $axios }) {
    let staffs = await $axios.$get('staff/staffs');
    return { staffs };
  },
  computed: {
    groups() {
      return Object.keys(this.staffs);
    },
    allStaffs() {
      const allImage = [];
      for (const groupKey in this.staffs) {
        const group = this.staffs[groupKey];
        for (const subGroupKey in group) {
          for (const staff of group[subGroupKey]) {
            allImage.push(staff);
          }
        }
      }
      return allImage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'assets/variables.scss';
.stickyBar {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: row;
  z-index: 2;
  background-color: map-get($map: $material-dark, $key: 'background');
  width: 100vw;
  overflow: hidden;
}
.item {
  margin: auto 5vw;
  padding: 3vh 0px;
}
</style>
