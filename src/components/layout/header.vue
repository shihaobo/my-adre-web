<template>
  <header class="layout-header">
    <img class="logo" src="@/assets/logo.png" alt="logo" />
    <div class="others"></div>
    <div class="user">
      <t-popup overlayClassName="user-popup">
        <div class="outer">
          <img src="@/assets/avatar.png" alt="avatar" />
          <p>王也</p>
          <chevron-down-icon />
        </div>
        <template #content>
          <div class="user-inner">
            <img src="@/assets/avatar.png" alt="avatar" />
            <p class="name">王也</p>
            <p>产品经理</p>
            <p>人力资源总部</p>
            <div class="footer">
              <t-button theme="default" variant="dashed">退出登录</t-button>
            </div>
          </div>
        </template>
      </t-popup>
    </div>
  </header>
</template>
<script>
import { ChevronDownIcon } from "tdesign-icons-vue";
export default {
  name: "layout-header",
  components: {
    ChevronDownIcon,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables.less";
.layout-header {
  display: flex;
  align-items: center;
  height: 68px;
  border-bottom: 1px solid @border-color;
  .logo {
    width: 146px;
    height: 33px;
    margin-left: 28px;
  }
  .others {
    flex: 1;
  }
  .user {
    margin-right: 40px;
    .outer {
      display: flex;
      align-items: center;
      cursor: default;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        margin-left: 7px;
        font-size: @font-size-l;
        color: @text-color-1;
      }
    }
  }
}
.user-inner {
  width: 240px;
  text-align: center;
  font-size: @font-size-s;
  padding: 0;
  img {
    width: 88px;
    height: 88px;
  }
  p {
    line-height: 20px;
    margin-bottom: 4px;
    &:not(.name) {
      color: @text-color-1;
    }
  }
  .footer {
    margin-top: 10px;
    padding: 16px;
    border-top: 0.5px solid @border-color;
  }
}
</style>
<style lang="less">
.user-popup {
  left: -10px;
}
</style>
