<template>
  <v-app>
    <div class="first-slider" style="position: relative;">
      <div class="slider-text">
        <div style="margin-top: 150px; font-size: 6rem;">
          سوالات متداول
        </div>
        <div style="font-size: 50px;">
          <span style="  color: transparent; border: white; -webkit-text-stroke: 2px white; font-size: 6rem;">و</span>
          <span style="font-size: 6rem;">قوانین</span>
        </div>
        <div>
          این مجموعه برای پاسخگویی به سوالات رایج در مورد نبرد هوش مصنوعی شریف
          <br />
          و قوانین آن طراحی شده است
        </div>
      </div>
    <div class="vl"></div>
    </div>
    <div class="titles">

    <div>
      sghllsdcs
    </div>
        <div>
      sghllsdcs
    </div>
        <div>
      sghllsdcs
    </div>
    </div>


  </v-app>
</template>

<script>
export default {
  layout: 'landing',
  auth: false,

};
</script>

<style>
.first-slider {
  background-color: var(--v-primary-base);
  height: 100vh;
}
.slider-text {
  margin-right: 50px;
  position: absolute;
}
.vl {
  border-left: 3px solid white;
  height: 150px;
  position: absolute;
  left: 49%;
  bottom: 0px;

}
.titles{
    display: flex;
    justify-content:space-evenly;

}
</style>
