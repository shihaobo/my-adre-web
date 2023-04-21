<template>
  <div id="app">
    <Watermark :options="watermarkOptions">
      <t-loading :loading="Boolean(globalLoading)" fullscreen></t-loading>
      <router-view v-if="isRouterAlive && isShowApp" />
      <layout-skeleton v-else />
    </Watermark>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Watermark } from "@pansy/vue-watermark";
import LayoutSkeleton from "@/components/layout/skeleton.vue";

export default {
  components: {
    Watermark,
    LayoutSkeleton,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      watermarkOptions: {
        width: 180,
        height: 96,
        text: "",
      },
    };
  },
  computed: {
    ...mapState("common", ["userInfo", "isShowApp", "globalLoading"]),
  },
  watch: {
    userInfo: {
      handler(val) {
        const { name, phoneLast4 } = val;
        const text = `${name}  ${phoneLast4}`;
        this.watermarkOptions.text = text;
      },
      deep: true,
    },
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import url("@/style/variables");

#app {
  overflow: auto;
  height: 100vh;
}
</style>
