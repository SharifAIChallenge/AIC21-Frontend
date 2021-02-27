<template>
  <div>
    <div id="intersection" class="intersection">
      <div class="scrollInterSec d-flex text-center justify-center">
        <!-- about -->
        <div class="d-flex about-menu">
          <span @click="interFunc('about')" class="wraper">
            <span :class="isIntersecAbout ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
            <span class="ml-6 intersectionItem">
              درباره ما
            </span>
          </span>
        </div>
        <!-- video -->
        <div class="d-flex video-menu">
          <span @click="interFunc('video')" class="wraper">
            <span :class="isIntersecVideo ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
            <span class="ml-6 intersectionItem">
              ویدیو
            </span>
          </span>
        </div>
        <!-- timeline -->
        <div class="d-flex timeline-menu">
          <span @click="interFunc('timeline')" class="wraper">
            <span :class="isIntersecTimeline ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
            <span class="ml-6 intersectionItem">
              برنامه زمانی
            </span>
          </span>
        </div>
        <!-- trophy -->
        <div class="d-flex trophy-menu">
          <span @click="interFunc('trophy')" class="wraper">
            <span :class="isIntersecTrophy ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
            <span class="ml-6 intersectionItem">
              جوایز
            </span>
          </span>
        </div>
        <!-- staff -->
        <div class="d-flex staff-menu">
          <span @click="interFunc('staff')" class="wraper">
            <span :class="isIntersecStaff ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
            <span class="ml-6 intersectionItem">
              تیم ما
            </span>
          </span>
        </div>
        <!-- sponser -->
        <div class="d-flex sponser-menu">
          <span @click="interFunc('sponser')" class="wraper">
            <span :class="isIntersecSponser ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
            <span class="ml-6 intersectionItem">
              اسپانسر
            </span>
          </span>
        </div>
      </div>
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
@import '../../assets/mixins.scss';

#intersection {
  position: fixed;
  transition: 0.4s;
  bottom: 50%;
  left: 30px;
  transform: translateY(50%);
  z-index: 100;
  transition: 0.4s;
  @include not-md {
    background-color: #0e1224;
  }
  .scrollInterSec {
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-end;
    @include not-md {
      flex-direction: row;
      align-items: center;
      min-width: 100vw;
      width: 530px;
    }
    > div {
      justify-content: flex-end;
      width: 150px;
      @include not-md {
        justify-content: center;
        width: auto;
        margin: 0 20px;
      }
    }
  }
  @include not-md {
    overflow-y: hidden;
    overflow-x: scroll;
    bottom: 0;
    transform: translateY(0);
    width: 100vw;
    left: 0 !important;
    height: 60px;
  }
  .intersectionItem {
    transition: 0.4s;
    padding: 8px 0 8px 8px;
    display: block;
    transform: translateX(-200px);
    position: relative;
    z-index: 200;
    @include not-md {
      margin: 0 !important;
      padding: 8px 0;
      transform: translateX(0) !important;
    }
  }
  .wraper {
    cursor: pointer;
    position: relative;
    &:hover {
      .intersectionItem {
        transform: translateX(0px) !important;
        color: var(--v-primary-base);
      }
      .intersectionSpan {
        width: 100%;
        background: var(--v-primary-base);
      }
    }
    @include not-md {
      // width: 100px;
    }
  }
}
.intersectionSpan {
  width: 20px;
  height: 2px;
  background-color: white;
  position: absolute;
  left: 0;
  top: 70%;
  transition: 0.4s;
  @include not-md {
    top: 82%;
    width: 100%;
    // left: 20%;
    height: 1px;
  }
}
.active_interSection {
  background-color: var(--v-primary-base);
  ~ .intersectionItem {
    @include not-md {
      color: var(--v-primary-base);
    }
  }
}
#main {
  position: relative;
}
</style>
