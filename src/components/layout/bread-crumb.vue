<template>
  <div class="bread-crumb">
    <t-breadcrumb>
      <template v-slot:default>
        <t-breadcrumbItem v-if="isShowBack" @click="handleGoBack">
          <arrow-left-icon />返回
        </t-breadcrumbItem>
        <t-breadcrumbItem disabled :to="{ path: $route.fullPath }">{{
          title
        }}</t-breadcrumbItem>
      </template>
      <template v-slot:separator>
        <t-divider layout="vertical" />
      </template>
    </t-breadcrumb>
  </div>
</template>
<script>
import { ArrowLeftIcon } from "tdesign-icons-vue";

export default {
  name: "bread-crumb",
  components: {
    ArrowLeftIcon,
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    isShowBack() {
      return this.$route.meta.isShowBack;
    },
  },
  methods: {
    handleGoBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables.less";

.bread-crumb {
  .t-breadcrumb {
    line-height: 40px;
    .t-breadcrumb__item {
      color: @text-color-1;
      /deep/ .t-is-disabled .t-breadcrumb__inner {
        color: @text-color-1;
      }
    }
    .t-divider {
      height: 0.8em;
      margin: 0 4px;
      border-color: @text-color-1;
    }
  }
}
</style>
