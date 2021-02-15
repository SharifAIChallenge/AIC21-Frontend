<template>
    <v-app-bar flat color="transparent">
        <v-btn icon class="transparent hidden-sm-and-up">
            <v-icon>
                mdi-menu
            </v-icon>
        </v-btn>
        <div class="hidden-xs-only">
            <v-btn plain text tile class="transparent mx-4 ">ورود</v-btn>
            <v-btn plain text tile class="transparent mx-4">اخبار</v-btn>
            <v-btn plain text tile class="transparent mx-4">تاریخچه</v-btn>
            <v-btn plain text tile class="transparent mx-4">سوالات متداول</v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-btn plain text tile class="transparent mx-4 hidden-sm-and-up">ورود</v-btn>
        <v-spacer></v-spacer>
        <logo/>
    </v-app-bar>
</template>
<script>
import LogoMark from '~/components/LogoMark'
export default {
    components:{
        logo:LogoMark
    }
}
</script>

