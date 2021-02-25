<template>
  <div>
      {{aq}}
  </div>
</template>

<script>
import { PastAi } from '~/api/index';

export default {
  async asyncData({ $axios }) {
    let data = await PastAi($axios);
    let aq = data;
    return {
      aq,
    };
  },
}
</script>

<style>

</style>