<template>
  <!-- 骨架屏 -->
  <div class="layout-skeleton">
    <t-skeleton
      v-for="item in list"
      :key="item"
      :class="item"
      :loading="true"
      animation="gradient"
      theme="text"
    ></t-skeleton>
  </div>
</template>

<script>
export default {
  name: "layout-skeleton",
  data() {
    return {
      list: ["header", "aside", "content"],
    };
  },
};
</script>
<style lang="less" scoped>
/deep/ .header {
  .t-skeleton__col {
    margin-bottom: 16px;
    height: 68px;
  }
}

/deep/ .aside {
  float: left;

  .t-skeleton__col {
    width: 232px;
    height: calc(100vh - 84px);
  }
}

/deep/ .content {
  float: left;

  .t-skeleton__col {
    margin-left: 16px;
    width: calc(100vw - 264px);
    height: calc(100vh - 84px);
  }
}
</style>
