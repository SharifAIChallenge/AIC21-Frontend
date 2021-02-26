<template>
  <div>
    <div class="techDiv">
      <div class="text-left">
        <span v-for="team in teams" :key="team" class="px-5 ma-5">{{ team }}</span>
      </div>
    </div>
    <section class="ma-5" v-for="team in teams" :key="team">
      <h1>{{ team }}</h1>
      <v-row>
        <v-col cols="3" v-for="(staff, index) in group[team]" :key="index">
          <div>
            <StaffCard class="mt-3" :staff="staff" />
          </div>
        </v-col>
      </v-row>
    </section>
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
