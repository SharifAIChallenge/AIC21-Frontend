<template>
  <v-row>
    <v-col cols="4" lg="3">
      <v-treeview
        :items="items"
        open-on-click
        activatable
        dense
        :transition="true"
        @update:open="open($event)"
        :open="openIds"
        @update:active="active($event)"
        :active="activeIds"
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            mdi-file
          </v-icon>
        </template>
      </v-treeview>
    </v-col>
    <v-col cols="12" sm="8" md="5" lg="6">
      <markdown-renderer :content="content" />
    </v-col>
  </v-row>
</template>

<script>
const fm = require('front-matter');
import { parseGithubData, findActiveNode, findOpenIds, findActiveIds } from './parseGithubData';
import MarkdownRenderer from './MarkdownRenderer.vue';
export default {
  data() {
    return {
      items: [],
      openIds: [],
      activeIds: [],
      metaData: {},
      content: '',
    };
  },
  components: { MarkdownRenderer },
  async fetch() {
    let slug = this.$route.params.slug;
    const url = 'https://api.github.com/repos/jamshidi799/markdownContent/git/trees/main?recursive=1';
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        this.items = parseGithubData(res);
        let activeNode = findActiveNode(res, slug);
        this.openIds = findOpenIds(activeNode);
        this.activeIds = findActiveIds(activeNode);

        const url = `https://raw.githubusercontent.com/jamshidi799/markdownContent/main/${activeNode.path}`;
        return fetch(url);
      })
      .then(res => res.text())
      .then(res => {
        this.metaData = fm(res);
        this.content = '${toc} \n' + this.metaData.body;
      });
  },
  methods: {
    active(name) {
      const splittedPath = name[0].split('/');
      const fileName = splittedPath[splittedPath.length - 1];
      const slug = fileName.substring(0, fileName.length - 3);
      this.$router.push(`${slug}`);
      const url = `https://raw.githubusercontent.com/jamshidi799/markdownContent/main/${name[0]}`;
      fetch(url)
        .then(res => res.text())
        .then(res => {
          this.metaData = fm(res);
          this.content = '${toc} \n' + this.metaData.body;
        });
    },
    open(items) {
      this.openIds = items;
    },
  },
};
</script>
