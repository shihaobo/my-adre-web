<template>
  <div class="app-wrapper">
    <layout-header />
    <div class="app-main">
      <layout-aside />
      <div class="app-content">
        <bread-crumb></bread-crumb>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import LayoutHeader from "./header.vue";
import LayoutAside from "./aside.vue";
import BreadCrumb from "./bread-crumb.vue";

export default {
  name: "layout-index",
  components: {
    LayoutHeader,
    LayoutAside,
    BreadCrumb,
  },
};
</script>

<style lang="less" scoped>
@import "@/style/variables";

.app-wrapper {
  .app-main {
    display: flex;
    height: calc(100vh - 68px);
    background: @bg-color;
  }
  .app-content {
    flex: 1;
    padding: 0 32px 24px;
    overflow-y: scroll;
    .fade-leave-active,
    .fade-enter-active {
      transition: opacity @anim-duration-slow @anim-time-fn-easing;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
