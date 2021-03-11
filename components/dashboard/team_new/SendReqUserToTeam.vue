<template>
    <div>
        {{ team.id }}
    </div>
</template>
<script>
export default {
    props:['team'],
    async fetch(){
        console.log(this.team)
        await this.$axios.$get(`team/${this.team.id}`).then(res =>{
            console.log(res)
        })
    }
}
</script>