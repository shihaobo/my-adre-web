<template>
  <div class="app-wrapper">
    <layout-header />
    <div class="app-main">
      <layout-aside />
      <div class="app-content">
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

export default {
  name: "layout-index",
  components: {
    LayoutHeader,
    LayoutAside,
  },
};
</script>

<style lang="less" scoped>
@import "@/style/variables";
.app-wrapper {
  .app-main {
    display: flex;
    height: calc(100vh - 64px);
    background: #f4f2f2;
  }
  .app-content {
    flex: 1;
    padding: 50px 34px 37px 28px;
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
