<template>
  <div>
    <div id="intersection" class="d-flex flex-column align-end text-center justify-center intersection">
      <v-avatar width="100" class="d-flex justify-end">
        <span>
          <span :class="isIntersectingAbout ? 'ml-5 intersectionItem activeSection' : 'ml-5 intersectionItem'">
            درباره ما
          </span>
          <span :class="isIntersectingAbout ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <v-avatar width="100" class="d-flex justify-end">
        <span>
          <span :class="isIntersectingTimeline ? 'ml-5 intersectionItem activeSection' : 'ml-5 intersectionItem'">
            زمانبندی
          </span>
          <span :class="isIntersectingTimeline ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
    </div>
    <About :onIntersectAbout="onIntersectAbout" />
    <Timeline :onIntersectTimeline="onIntersectTimeline" />
  </div>
</template>
<script>
import About from '~/components/landing/About.vue';
import Timeline from '~/components/landing/Timeline.vue';
export default {
  components: { About, Timeline },
  data: () => ({
    isIntersectingAbout: false,
    isIntersectingTimeline: false,
  }),

  methods: {
    onIntersectAbout(entries, observer) {
      this.isIntersectingAbout = entries[0].isIntersecting;
      //  document.querySelector('.intersectionItem:nth-of-type(1)').classList.remove('')
    },
    onIntersectTimeline(entries, observer) {
      this.isIntersectingTimeline = entries[0].isIntersecting;
      // document.querySelector('.intersectionItem:nth-of-type(2)').classList.remove('disableSection')
    },
  },
};
</script>

<style>
.activeSection {
  opacity: 1 !important;
  transition: 0.4s;
}
.intersectionItem {
  opacity: 0;
  transition: 0.4s;
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
  background-color: rgb(255, 0, 55);
  position: absolute;
  left: 0;
  top: 62%;
  transition: 0.4s;
}
.active_interSection {
  width: 80px;
}
</style>
