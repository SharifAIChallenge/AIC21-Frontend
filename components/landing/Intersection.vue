<template>
  <div>
    <div id="intersection" class="d-flex flex-column align-end text-center justify-center intersection">
      <v-avatar width="100" class="d-flex justify-end">
        <span class="ml-5">
          درباره ما
          <span :class="isIntersectingAbout ? 'active_interSection intersectionSpan' : 'intersectionSpan'"></span>
        </span>
      </v-avatar>
      <v-avatar width="100" class="d-flex justify-end">
        <span class="ml-5">
          زمانبندی
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
    },
    onIntersectTimeline(entries, observer) {
      this.isIntersectingTimeline = entries[0].isIntersecting;
    },
  },
};
</script>

<style>
.intersection {
  position: sticky;
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
