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
    margin-bottom: 15px;
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
    counter-increment: list-item;
    font-weight: 300;
    font-family: LTZaridSans;
    font-size: 1.25rem;
    margin-right: 25px;
  }
  li:before {
    // content: counters(list-item, '.') ' ';
  }
  pre {
    overflow-x: auto;
    margin: 30px 0;
    display: flex;
    justify-content: flex-end;
  }
  p {
    & img {
      display: flex;
    }
    & code {
      display: flex;
    }
    img {
      // max-width: 100%;
      margin: 60px auto;
      @include responsive(width, 300px, 350px, 400px, 450px, 500px, 650px);
    }
    a {
      margin: 0px 5px;
    }
  }
  code {
    margin: 14px 0px;
    text-align: left;
    padding: 10px 14px;
    direction: ltr;
    width: 100%;
    overflow-x: auto;
  }
  table {
    margin: 20px auto;
    th,
    td {
      padding: 8px;
      @include not-md {
        padding: 5px 0px;
      }
    }
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
      margin: 0;
      display: block;
      font-family: 'Vazir', serif;
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
