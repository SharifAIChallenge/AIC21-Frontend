<template>
  <v-chip dir="ltr">
    <v-icon right>
      {{ icon[language].i }}
    </v-icon>
    {{ icon[language].text }}
  </v-chip>
</template>

<script>
export default {
  props: {
    language: {
      type: String,
      default: 'jar',
    },
  },
  data() {
    return {
      icon: {
        jar: { i: 'mdi-language-java', color: 'success', text: 'jar' },
        java: { i: 'mdi-language-java', color: 'success', text: 'java' },
        cpp: { i: 'mdi-language-cpp', color: 'error', text: 'Cpp' },
        py3: { i: 'mdi-language-python', color: 'info', text: 'Python' },
        go: { i: 'mdi-language-go', color: 'info', text: 'Go' },
      },
    };
  },
};
</script>
