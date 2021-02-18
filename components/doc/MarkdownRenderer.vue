<template>
  <div class="markdown">
    <div v-html="$md.render(content)" dir="ltr"></div>
  </div>
</template>

<script>
export default {
  props: ['content'],
};
</script>

<style lang="scss">
.markdown {
  ol {
    counter-reset: list-item;
  }
  li {
    display: block;
    counter-increment: list-item;
  }
  li:before {
    content: counters(list-item, '.') ' ';
  }
  .table-of-contents {
    position: fixed;
    left: 0;
    top: 40px;
    &::before {
      content: 'table of content';
      position: relative;
      bottom: 10px;
      left: 10px;
      font-size: 1.4rem;
    }
    li {
      max-width: 250px;
    }
  }
}
</style>
