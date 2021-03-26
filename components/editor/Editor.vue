<template>
  <section class="editor-container">
    <client-only>
      <quill-editor ref="editor" v-model="content" :options="editorOption" @change="onChange($event)" />
    </client-only>
  </section>
</template>

<script>
export default {
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
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ],
        },
        color: 'white',
        placeholder: 'متن موردنظر',
      },
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.content = 'I was changed!';
    // }, 3000);
  },
  methods: {
    onChange(editor) {
      this.$emit('update', this.content);
    },
    // onEditorBlur(editor) {
    //   console.log('editor blur!', this.content);
    // },
    // onEditorFocus(editor) {
    //   console.log('editor focus!', this.content);
    // },
    // onEditorReady(editor) {
    //   console.log('editor ready!', this.content);
    // },
  },
};
</script>

<style lang="scss">
.editor-container {
  width: 100%;
  margin: 0 auto;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
  .ql-editor {
    min-height: 200px;
  }
  .ql-blank {
    text-align: right;
  }
}
</style>
