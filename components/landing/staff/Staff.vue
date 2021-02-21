<template>
    <v-container class="my-15">
    <div class="mb-12 text-center white--text text-h3 font-weight-bold" width="100%">تیم ما</div>
    <v-row>
        <v-col cols="12" lg="3" md="4" sm="6" v-for="n in 4" class="d-flex justify-center px-2" :key="n">
        <StaffCard/>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import StaffCard from './StaffCard'
export default {
    components:{
        StaffCard
    }
}
</script>