<template>
  <v-container>
    <div class="markdown">
      <div v-html="$md.render(content)"></div>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ['content'],
};
</script>

<style lang="scss">
@import 'assets/mixins.scss';
@import 'assets/variables.scss';

.markdown {
  padding: 100px 0px 100px;
  h1,
  h2,
  h3 {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    a.header-anchor {
      opacity: 0;
      transition: all 0.7s;
    }
    &:hover {
      a.header-anchor {
        opacity: 1;
      }
    }
  }
  ol {
    counter-reset: list-item;
    padding-right: 10px;
  }
  li {
    display: block;
    counter-increment: list-item;
  }
  li:before {
    // content: counters(list-item, '.') ' ';
  }
  img {
    max-width: 100%;
  }
  .table-of-contents {
    position: fixed;
    left: 0;
    top: 0px;
    padding-top: 26px;
    padding-right: 30px;
    min-height: 100vh;
    background: map-get($material-dark-elevation-colors, '12');
    @include v-xl {
      width: 20%;
    }
    @include v-lg {
      width: 20%;
    }
    @include not-lg {
      display: none;
    }
    &::before {
      content: 'فهرست موضوعات';
      position: relative;
      bottom: 10px;
      left: 10px;
      font-size: 1.4rem;
      padding-right: 10px;
    }
    li {
      font-size: 1.1rem;
      padding: 4px 0px;

      @include v-lg {
        font-size: 0.8rem;
        padding: 4px 0px;
      }
      @include v-xl {
        font-size: 1.3rem;
        padding: 4px 0px;
      }
      a {
        text-decoration: none;
        width: 100%;
        display: block;
        &:hover {
          color: var(--v-primary-darken1);
        }
      }
    }
  }
}
</style>
