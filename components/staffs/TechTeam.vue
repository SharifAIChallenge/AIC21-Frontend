<template>
  <div class="mt-7 mx-15">
    <h1 v-for="key in keys" :key="key">{{ key }}</h1>
    <v-container class="mt-7">
      <div class="techTeam">
        <p>گرافیک</p>
      </div>
      <v-row>
        <v-col cols="12" lg="3" md="4" v-for="n in 4" class="d-flex justify-center px-2" :key="n"><StaffCard /></v-col>
      </v-row>
      <div class="techTeam pt-7">
        <p>سایت</p>
      </div>
      <v-row>
        <v-col cols="12" lg="3" md="4" v-for="n in 4" class="d-flex justify-center px-2" :key="n"><StaffCard /></v-col>
      </v-row>
      <div class="techTeam pt-7">
        <p>زیرساخت</p>
      </div>
      <v-row>
        <v-col cols="12" lg="3" md="4" v-for="n in 4" class="d-flex justify-center px-2" :key="n"><StaffCard /></v-col>
      </v-row>
      <div class="techTeam pt-7">
        <p>سرور و کلاینت</p>
      </div>
      <v-row>
        <v-col cols="12" lg="3" md="4" v-for="n in 4" class="d-flex justify-center px-2" :key="n"><StaffCard /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StaffCard from '../landing/staff/StaffCard';
export default {
  props: {
    techStaffs:{
      type : Array
    }
  },
  data() {
    return {
      graphicTeam: [],
      webTeam: [],
      substructureTeam: [],
      serverTeam: [],
    };
  },
  components: {
    StaffCard,
  },
  methods: {},
  mounted() {},
  computed: {
    keys() {
      return Object.keys(this.techStaffs)
    },
  },
};
</script>

<style lang="scss" scoped>
.techTeam {
  margin: auto;
  p {
    font-size: 2rem;
    color: var(--v-primary-base);
    font-weight: bold;
  }
}
</style>
