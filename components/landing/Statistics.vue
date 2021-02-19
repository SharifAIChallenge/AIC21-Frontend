<template>
  <v-card tile flat class="secondary my-5">
    <v-row class="px-10 py-3">
      <v-col lg="3" md="3" sm="6" v-for="(stat,i) in stats" :key="i">
        <v-card-text class="d-flex flex-column px-10 py-0 text-right mx-auto" style="max-width:150px">
          <v-icon x-large right class="pb-2 black--text">{{stat.icon}}</v-icon>
          <span class="text-h5 pb-1">{{stat.part}}</span>
          <span class="pt-1" style="border-top:1px solid white">{{stat.info}}</span>
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
                    icon:'mdi-clipboard-account',
                    part:NaN,
                    info:'شرکت کننده'
                },
                {
                    icon:'mdi-account-group',
                    part:NaN,
                    info:'تیم'
                },
                {
                    icon:'mdi-code-braces-box',
                    part:NaN,
                    info:'ارسال کد'
                },
                {
                    icon:'mdi-sword-cross',
                    part:NaN,
                    info:'نبرد'
                },
            ]
        }
    }
}
</script>