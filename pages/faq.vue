<template>
  <v-app>
    <div class="first-slider" style="position: relative;">
      <div class="slider-text">
        <div style="margin-top: 20vh; font-size: 6rem;">
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
      <div class="title">
        عمومی
      </div>
      <div class="title">
        زمان بندی
      </div>
      <div class="title">
        مسابقه
      </div>
    </div>
    <div class="faq-container">
      <div class="faq-card">
        <div class="faq-card-title">
          <v-icon left color="primary" size="55">
            mdi-calendar
          </v-icon>
          نبرد هوش مصنوعی چگونه کار می کند
        </div>
        <span class="faq-card-text">
          cwewedw ed eeeeeeeeeeeeeeeییییeeeeeeeee web kitd wedw edw ed wedd
        </span>
      </div>
      <div class="faq-card">
        <div class="faq-card-title">
          <v-icon left color="primary" size="55">
            mdi-calendar
          </v-icon>
          نبرد هوش مصنوعی چگونه کار می کند
        </div>
        <span class="faq-card-text">
          cwewedw ed eeeeeeeeeeeeeeeییییeeeeeeeee web kitd wedw edw ed wedd
        </span>
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
.titles {
  position: sticky;
  display: flex;
  justify-content: center;
  height: 100px;
  margin-top: auto;
}
.title {
  position: sticky;
  margin: auto 50px;
}
.faq-container {
  display: flex;
  justify-content: space-evenly;
}
.faq-card {
  position: relative;
  max-width: 450px !important;
  height: 500px;
  border: 3px solid red;
  padding: 20px;
  /* margin: 20px; */
}
.faq-card-title {
  position: absolute;
  display: inline-block;
  margin-top: 50px;
  font-size: 2rem;
}
.faq-card-text {
  position: absolute;
  margin-top: 200px;
  margin-left: 30px;
  margin-right: 20px;
}
</style>
