<template>
  <div>post page {{ slug }}</div>
</template>

<script>
export default {
  auth: false,
  async asyncData({ params }) {
    const slug = params.slug;
    return { slug };
  },
};
</script>

<style></style>
