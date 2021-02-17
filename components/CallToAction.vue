<template>
  <v-card class="transparent mx-auto px-4" style="width:600px">
    <v-row>
      <v-col cols="6">
        <div class="d-flex flex-column align-center">
          <div>همین حالا</div>
          <div class="primary--text">ثبت نام</div>
          <div>کنید</div>
        </div>
      </v-col>
      <v-col cols="6">
          <v-checkbox :label="label"></v-checkbox>
        <div>
          <v-btn plain block tile class="primary my-3 white--text text-center" width="100%">
            <v-icon>mdi-google</v-icon>
            ثبت نام باگوگل
          </v-btn>
          <v-btn plain block tile class="white--text my-3 text-center" width="100%">
            ثبت نام با ایمیل و رمز عبور
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
    data(){
        return{
            label:'شرایط و قوانین را می پذیرم'
        }
    }
}
</script>