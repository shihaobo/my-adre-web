<template>
  <div class="sany-layout">
    <layout-header />
    <t-layout>
      <t-aside>
        <layout-aside />
      </t-aside>
      <t-content>
        <router-view />
      </t-content>
    </t-layout>
  </div>
</template>
<script>
import LayoutHeader from "./header.vue";
import LayoutAside from "./aside.vue";

export default {
  name: "layout-index",
  components: {
    LayoutHeader,
    LayoutAside,
  },
};
</script>

<style lang="less" scoped>
.sany-layout {
  .t-layout {
    height: calc(100vh - 64px);
    overflow-y: scroll;
  }
}
</style>
