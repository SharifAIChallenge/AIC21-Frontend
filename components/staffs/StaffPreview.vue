<template>
    <div >
        <div v-for="(team,index) in teams" :key="team">
        {{ index }}
        </div>
        <!-- {{ this.allStaffs }} -->
    </div>
</template>
<script>
export default {
  data() {
    return {
        allStaffs:[]
    };
  },
  props: ['staffs'],
  methods:{
      mergeStaffs(teams){
          for (let team in teams){
              console.log(this.staffs[team])
              this.allStaffs.push(this.staffs[team])
          }
      }
  },
  computed:{
      teams(){
          return Object.keys(this.staffs);
      }
  },
  mounted(){
      this.mergeStaffs(this.teams);
      
  }
};
</script>
