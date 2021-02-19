<template>
  <div>
    <div v-for="(comment, index) in comments" :key="index">
      <preview :comment="comment" />
    </div>
    <editor :handleSubmit="add" />
  </div>
</template>

<script>
import Editor from '../components/editor/Editor';
import Preview from '../components/editor/Preview';
export default {
  auth: false,
  components: { Editor, Preview },
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    add(comment) {
      this.comments.push(comment);
    },
  },
};
</script>

<style></style>
