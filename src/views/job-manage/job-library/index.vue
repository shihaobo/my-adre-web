<template>
  <div>
    <p>111</p>
  </div>
</template>

<script>
export default {
  name: "job-library",
  data() {
    return {
      expanded: ["2", "3"],
      expanded2: ["2"],
      disabled: true,
      collapsed: false,
      collapsed2: false,
    };
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
    changeCollapsed2() {
      this.collapsed2 = !this.collapsed2;
    },
  },
};
</script>
