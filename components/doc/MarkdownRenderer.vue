<template>
  <div class="markdown">
    <div v-html="$md.render(content)"></div>
  </div>
</template>

<script>
export default {
  props: ['content'],
};
</script>

<style lang="scss">
@import 'assets/mixins.scss';

.markdown {
  padding: 40px 10px 100px;
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
  img {
    max-width: 100%;
  }
  .table-of-contents {
    position: fixed;
    left: 0;
    top: 40px;
    padding-top: 16px;
    max-height: 95vh;
    // overflow: auto;
    @include not-lg {
      display: none;
    }
    &::before {
      content: 'table of content';
      position: relative;
      bottom: 10px;
      left: 10px;
      font-size: 1.4rem;
    }
    li {
      max-width: 250px;
      font-size: 0.8rem;
      a {
        text-decoration: none;
      }
    }
  }
}
</style>
