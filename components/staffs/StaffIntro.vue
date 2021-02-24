<template>
  <div>
    <div class="techDiv">
      <h1 class="text-right">فنی</h1>
      <div class="text-left">
        <span v-for="team in teams" :key="team" class="px-5">{{ team }}</span>
      </div>
    </div>
    <section v-for="team in teams" :key="team">
      <h1>{{ team }}</h1>
      <v-row>
        <v-col cols="4" v-for="(staff, index) in group[team]" :key="index">
          <!-- <staff-card /> -->
          <div>
            {{ staff }}
          </div>
        </v-col>
      </v-row>
    </section>
    <!-- <app-techTeam :techStaffs="techStaffs"></app-techTeam> -->
    <!-- <div class="marketing mt-15">
      <h1 class="text-right">برندینگ</h1>
      <div class="text-left">
        <span class="px-5">محتوا</span>
        <span class="px-5">مدیا</span>
      </div>
    </div> -->
  </div>
</template>
<script>
import StaffCard from '../landing/staff/StaffCard.vue';
import TechTeam from './TechTeam';
export default {
  props: ['group'],
  components: {
    'app-techTeam': TechTeam,
    StaffCard,
  },
  methods: {},
  computed: {
    teams() {
      return Object.keys(this.group);
    },
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
