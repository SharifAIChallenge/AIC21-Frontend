<template>
  <div>
    <div id="intersection" class="d-flex flex-column align-end text-center justify-center intersection">
      <!-- about -->
      <v-avatar width="150" class="d-flex justify-end">
        <span @click="interFunc('about')" class="wraper">
          <span class="ml-6 intersectionItem">
            درباره ما
          </span>
          <span :class="isIntersecAbout ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- video -->
      <v-avatar width="150" class="d-flex justify-end">
        <span @click="interFunc('video')" class="wraper">
          <span class="ml-6 intersectionItem">
            ویدیو
          </span>
          <span :class="isIntersecVideo ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- timeline -->
      <v-avatar width="150" class="d-flex justify-end">
        <span @click="interFunc('timeline')" class="wraper">
          <span class="ml-6 intersectionItem">
            برنامه زمانی
          </span>
          <span :class="isIntersecTimeline ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- trophy -->
      <v-avatar width="150" class="d-flex justify-end">
        <span @click="interFunc('trophy')" class="wraper">
          <span class="ml-6 intersectionItem">
            جوایز
          </span>
          <span :class="isIntersecTrophy ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- staff -->
      <v-avatar width="150" class="d-flex justify-end">
        <span @click="interFunc('staff')" class="wraper">
          <span class="ml-6 intersectionItem">
            تیم ما
          </span>
          <span :class="isIntersecStaff ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <!-- sponser -->
      <v-avatar width="150" class="d-flex justify-end">
        <span @click="interFunc('sponser')" class="wraper">
          <span class="ml-6 intersectionItem">
            اسپانسر
          </span>
          <span :class="isIntersecSponser ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    interFunc(item) {
      let scroll = 0;
      if (item === 'trophy' && window.innerWidth < 960) {
        scroll = document.getElementById('trophyM').getBoundingClientRect().top;
      } else {
        scroll = document.getElementById(item).getBoundingClientRect().top;
      }
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
#intersection {
  .wraper {
    cursor: pointer;
    position: relative;
    &:hover {
      .intersectionItem {
        transform: translateX(0px) !important;
      }
      .intersectionSpan {
        width: 100%;
        transition-delay: 0.4s;
      }
    }
  }
}
.intersectionItem {
  transition: 0.4s;
  padding: 8px;
  display: block;
  transform: translateX(-100px);
}
#main {
  position: relative;
}
.intersection {
  position: fixed;
  transition: 0.4s;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  z-index: 100;
  transition: 0.4s;
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
  background-color: rgb(255, 0, 55);
}
</style>
