export const parseGithubData = res => {
  let items = [];
  let maxDepth = 0;
  res.tree.forEach(node => {
    if (node.type === 'blob' && node.path.includes('.md') && !node.path.toLowerCase().includes('readme')) {
      const nodePath = node.path;
      const splittedPath = nodePath.split('/');
      const fileName = splittedPath[splittedPath.length - 1];
      const slug = fileName.substring(2, fileName.length - 3);
      // try {
      //   slug.replaceAll(/-/g, ' ');
      // } catch (e) {
      //   console.log(slug);
      // }
      items.push({
        id: nodePath,
        name: slug.replace(/-/g, ' '),
        file: true,
        path: node.path.substring(0, nodePath.length - fileName.length - 1),
        completePath: nodePath,
      });

      if (maxDepth < splittedPath.length) maxDepth = splittedPath.length;
    }
  });
  let parent = {};
  for (let i = 0; i < maxDepth - 1; i++) {
    let newItems = [];
    parent = {};
    let currentParent = '';
    items.forEach(node => {
      const nodePath = node.path;
      const splittedPath = nodePath.split('/');
      const name = splittedPath[splittedPath.length - 1];

      if (nodePath === '') newItems.push(node);
      else if (currentParent === '') {
        parent = {
          id: nodePath,
          name,
          file: false,
          path: node.path.substring(0, nodePath.length - name.length - 1),
          completePath: nodePath,
          children: [node],
        };
        currentParent = name;
      } else if (currentParent === name) {
        parent.children.push(node);
      } else if (currentParent !== name) {
        newItems.push(parent);
        currentParent = name;
        parent = {
          id: nodePath,
          name,
          file: false,
          path: node.path.substring(0, nodePath.length - name.length - 1),
          completePath: nodePath,
          children: [node],
        };
      }
    });
    items = newItems;
  }
  // items.push(parent);
  return items;
};

export const findFirstUrl = () => {};

export const findOpenIds = activeNode => {
  let openIds = [];
  let currentPath = '';
  let splittedPath = activeNode.path.split('/');
  splittedPath.forEach(path => {
    currentPath += path;
    openIds.push(currentPath);
    currentPath += '/';
  });
  return openIds;
};
export const findActiveIds = activeNode => {
  return [activeNode.path];
};

export const findActiveNode = (res, slug) => {
  return res.tree.find(node => node.type === 'blob' && node.path.includes(slug));
};
