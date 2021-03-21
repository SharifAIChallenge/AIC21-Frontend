<template>
  <div>
    <div class="head primary align-center mb-16">
      <v-container>
        <v-row class="align-center">
          <h1 class="mr-7">
            {{ team }}
          </h1>
          <div class="d-flex flex-wrap mr-7">
            <v-card v-for="team in teams" :key="team" class="teams" color="primary" outlined tile>
              <p v-if="team !== 'null'">
                {{ team }}
              </p>
            </v-card>
          </div>
        </v-row>
      </v-container>
    </div>
    <div class="staff mt-7 mx-7 mb-10 py-5" v-for="team in teams" :key="team">
      <h1 class="primary--text" v-if="team !== 'null'">{{ team }}</h1>
      <v-row>
        <v-col md="3" sm="6" v-for="(staff, index) in group[team]" :key="index" class="mt-5">
          <StaffCard class="" :staff="staff" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import StaffCard from '../landing/staff/StaffCard.vue';
export default {
  props: ['group', 'team'],
  components: {
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
.head {
  display: flex;
  justify-content: flex-end;
  margin-left: 0px;
  margin-right: 0px;
  min-height: 30vh;

  h1 {
    margin-left: auto;
    font-size: 4rem;
    font-weight: bold;
  }
  .teams {
    margin-left: 1vw;
    padding: 1vw;
  }
}
</style>
