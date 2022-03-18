<template>
  <header class="layout-header">
    <img slot="logo" class="logo" src="@/assets/logo.png" alt="logo" />
    <h3>干部任免系统</h3>
    <div>
      <p>王也</p>
    </div>
  </header>
</template>
<script>
export default {
  name: "layout-header",
};
</script>
<style lang="less" scoped>
.layout-header {
  display: flex;
  height: 64px;
  background: #fff;
  align-items: center;
  img {
    width: 30px;
  }
  h3 {
    flex: 1;
    text-align: left;
  }
}
</style>
