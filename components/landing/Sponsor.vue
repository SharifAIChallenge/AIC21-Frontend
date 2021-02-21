<template>
  <v-app>
      <v-row>
          <v-col cols="6"  class="white ssc">
              <div class="white">
                  <img src="~assets/images\logo/ssc-logo.svg" class="sscLogo" >
              </div>
              
          </v-col>
          <v-col cols="6" align-self="center">
            <div class="sscIntro">
                <h4 class="">انجمن علمی دانشکده مهندسی کامپیوتر</h4>
                <br>
                <h3>دانشگاه صنعتی شریف</h3>
                <br>
                <h2>برگزار میکند</h2>
                </div>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="6" class="digikala" align-self="center">
              <h1>
                  با حمایت
              </h1>
              <br>
              <h2>
                  دیجیکالا
              </h2>
          </v-col>
          <v-col cols="6" class="digikalaLogoCol">
              <div>
                  <img src="~assets/images\logo/digikala-logo.svg" class="digikalaLogo">
              </div>
          </v-col>
      </v-row>
  </v-app>
</template>

<script>
export default {

}
</script>

<style>
.sscIntro{
    text-align: center;
}
.sscIntro h4{
    color: var(--v-primary-base);
}
.sscIntro h3{
    opacity: 0.9;
}
.sscLogo{
   width: 250px;
   margin-top: 150px;
   filter: invert(0%) sepia(0%) saturate(7500%) hue-rotate(327deg) brightness(0%) contrast(104%);
}
.digikala{
    text-align: center;
}
.digikala h2{
    color: var(--v-primary-base); 
}
.digikalaLogoCol{
    background-color: var(--v-primary-base);
    text-align: center;
}
.digikalaLogo{
    margin-top: 150px;
    width: 200px;
}
.ssc{
    text-align: center;
}
</style>