<template>
<div>
    <v-row
    align="center"
    justify="center"
>
        <v-btn
            
              icon
              :color="shareColor"
              @mouseover="shareColor='blue'"
              @mouseout="shareColor='gray'"
            >
              <v-icon>mdi-share</v-icon>
        </v-btn>
        <v-btn
                
              icon
              :color="likeColor"
              @click="likeColor=='pink'? likeColor='graDisabledy': likeColor='pink'"
            >
              <v-icon>mdi-heart</v-icon>
        </v-btn>
    </v-row>
</div>
</template>
<script>
export default {
    data(){
        return{
            likeColor:'gray',
            shareColor:'gray'
        }
    }
}
</script>

<style scoped>

</style>