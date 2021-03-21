<template>
  <NewGame />

</template>
<script>
import NewGame from '../components/dashboard/games_new/NewGame.vue'
import landing from '~/layouts/landing';
export default {
  layout:'landing',
  auth:false,
  components:{
    NewGame
  }
}
</script>
<style scoped lang='scss'>

</style>