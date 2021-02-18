<template>
  <section class="container">
    <client-only>
      <quill-editor
        ref="editor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
      <v-btn @click="submit">
        ثبت
      </v-btn>
    </client-only>
  </section>
</template>

<script>
export default {
  props: ['handleSubmit'],
  data() {
    return {
      content: '',
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ],
        },
      },
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.content = 'I was changed!';
    // }, 3000);
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', this.content);
    },
    onEditorFocus(editor) {
      console.log('editor focus!', this.content);
    },
    onEditorReady(editor) {
      console.log('editor ready!', this.content);
    },
    submit() {
      this.handleSubmit(this.content);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>
