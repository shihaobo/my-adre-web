<template>
  <div class="promote-letter-info bg-white">
    <h3 class="second-title">任职决定书</h3>
    <div class="content">
      <p>任职决定书</p>
      <div>
        <span>关于马化腾的任职决定书</span>
        <browse-icon />
        <download-icon />
      </div>
    </div>
  </div>
</template>
<script>
import { BrowseIcon, DownloadIcon } from "tdesign-icons-vue";
export default {
  name: "promote-letter-info",
  components: {
    BrowseIcon,
    DownloadIcon,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import "@/style/variables.less";
.promote-letter-info {
  margin-top: 16px;
  .content {
    display: flex;
    padding: 24px 36px;
    color: @text-color-1;
    p {
      height: 32px;
      line-height: 32px;
    }
    div {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 0 12px;
      margin-left: 18px;
      border: 1px solid @border-color-1;
      border-radius: @border-radius-s;
      /deep/ .t-icon {
        position: relative;
        top: 1px;
        margin-left: 8px;
        font-size: @font-size-base;
        cursor: pointer;
      }
    }
  }
}
</style>
