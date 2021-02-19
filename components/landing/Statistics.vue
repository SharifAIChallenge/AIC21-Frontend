<template>
  <v-card tile flat class="secondary mt-5">
    <v-row class="px-10">
      <v-col lg="3" md="4" sm="6" v-for="(stat,i) in stats" :key="i">
        <v-card-text class="d-flex flex-column px-10">
          <v-icon x-large class="pb-5">{{stat.icon}}</v-icon>
          <span class="text-h5">{{stat.part}}</span>
          <v-divider/>
          <span>{{stat.info}}</span>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
    data(){
        return{
            stats:[
                {
                    icon:'mdi-account-box',
                    part:NaN,
                    info:'شرکت کننده'
                },
                {
                    icon:'mdi-account-box',
                    part:NaN,
                    info:'تیم'
                },
                {
                    icon:'mdi-account-box',
                    part:NaN,
                    info:'ارسال کد'
                },
                {
                    icon:'mdi-account-box',
                    part:NaN,
                    info:'نبرد'
                },
            ]
        }
    }
}
</script>