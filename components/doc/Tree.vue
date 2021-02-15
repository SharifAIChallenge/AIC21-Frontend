<template>
  <v-treeview
    :items="items"
    open-on-click
    activatable
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
</template>

<script>
import { parseGithubData, findActiveNode, findOpenIds, findActiveIds } from './parseGithubData';
export default {
  data() {
    return {
      items: [],
      openIds: [],
      activeIds: [],
    };
  },
  async fetch() {
    let slug = this.$route.params.slug;
    const url = 'https://api.github.com/repos/jamshidi799/markdownContent/git/trees/main?recursive=1';
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        this.items = parseGithubData(res);
        let activeNode = findActiveNode(res, slug);
        this.$store.dispatch('doc/set', activeNode.path);
        this.openIds = findOpenIds(activeNode);
        this.activeIds = findActiveIds(activeNode);
      });
  },
  methods: {
    active(name) {
      const splittedPath = name[0].split('/');
      const fileName = splittedPath[splittedPath.length - 1];
      const slug = fileName.substring(0, fileName.length - 3);
      this.$router.push(`${slug}`);
      this.$store.dispatch('doc/set', name[0]);
    },
    open(items) {
      this.openIds = items;
    },
  },
};
</script>

<style></style>
