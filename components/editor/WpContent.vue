<script>
export default {
  props: {
    html: {
      type: String,
    },
  },
  computed: {
    dynamicComponent() {
      return {
        //template: `<section>${this.html}</section>`,
        template: `<div>${this.html}</div>`,
        props: [
          /* define props as needed */
        ],
      };
    },
  },
  render(createElement, context) {
    return createElement('div', [
      createElement(this.dynamicComponent, {
        props: {
          /* pass prop values as needed */
        },
      }),
    ]);
  },
};
</script>
