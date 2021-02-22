<template>
  <div>
    <div id="intersection" class="d-flex flex-column align-end text-center justify-center intersection">
      <!-- about -->
      <v-avatar width="100" class="d-flex justify-end">
        <span @click="interFunc('about')">
          <span :class="isIntersecAbout ? 'ml-5 intersectionItem activeSection' : 'ml-5 intersectionItem'">
            درباره ما
          </span>
          <span :class="isIntersecAbout ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- timeline -->
      <v-avatar width="100" class="d-flex justify-end">
        <span @click="interFunc('timeline')">
          <span :class="isIntersecTimeline ? 'ml-5 intersectionItem activeSection' : 'ml-5 intersectionItem'">
            زمانبندی
          </span>
          <span :class="isIntersecTimeline ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- video -->
      <v-avatar width="100" class="d-flex justify-end">
        <span @click="interFunc('video')">
          <span :class="isIntersecVideo ? 'ml-5 intersectionItem activeSection' : 'ml-5 intersectionItem'">
            ویدیو
          </span>
          <span :class="isIntersecVideo ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- trophy -->
      <v-avatar width="100" class="d-flex justify-end">
        <span @click="interFunc('trophy')">
          <span :class="isIntersecTrophy ? 'ml-5 intersectionItem activeSection' : 'ml-5 intersectionItem'">
            جوایز
          </span>
          <span :class="isIntersecTrophy ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- sponser -->
      <v-avatar width="100" class="d-flex justify-end">
        <span @click="interFunc('sponser')">
          <span :class="isIntersecSponser ? 'ml-5 intersectionItem activeSection' : 'ml-5 intersectionItem'">
            اسپانسر
          </span>
          <span :class="isIntersecSponser ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- staff -->
      <v-avatar width="100" class="d-flex justify-end">
        <span @click="interFunc('staff')">
          <span :class="isIntersecStaff ? 'ml-5 intersectionItem activeSection' : 'ml-5 intersectionItem'">
            تیم ما
          </span>
          <span :class="isIntersecStaff ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    interFunc(item) {
      let scroll = document.getElementById(item).getBoundingClientRect().top;
      let scrolltop = document.querySelector('html').scrollTop;
      window.scrollTo({
        top: scroll + scrolltop,
        behavior: 'smooth',
      });
    },
  },
  props: {
    isIntersecAbout: Boolean,
    isIntersecTimeline: Boolean,
    isIntersecSponser: Boolean,
    isIntersecVideo: Boolean,
    isIntersecStaff: Boolean,
    isIntersecTrophy: Boolean,
  },
};
</script>

<style lang="scss">
.activeSection {
  opacity: 1 !important;
  transition: 0.4s;
}
.intersectionItem {
  opacity: 0;
  transition: 0.4s;
  cursor: pointer;
  &:hover {
    opacity: 1 !important;
  }
}
#main {
  position: relative;
}
.intersection {
  position: fixed;
  transition: 0.4s;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 100;
}

.intersectionSpan {
  width: 20px;
  height: 2px;
  background-color: white;
  position: absolute;
  left: 0;
  top: 62%;
  transition: 0.4s;
}
.active_interSection {
  width: 80px;
  background-color: rgb(255, 0, 55);
}
</style>
