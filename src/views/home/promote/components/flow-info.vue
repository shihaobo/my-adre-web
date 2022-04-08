<template>
  <div class="promote-flow-info bg-white">
    <h3 class="second-title">流程处理</h3>
    <ul class="content">
      <li @click="addNode">
        <div><add-icon size="25px"></add-icon></div>
        <p class="name">王也</p>
        <p>业务主管</p>
      </li>
    </ul>
    <select-user v-if="visible" :visible.sync="visible"></select-user>
  </div>
</template>
<script>
import { AddIcon } from "tdesign-icons-vue";
import SelectUser from "@/components/select-user.vue";

export default {
  name: "promote-base-info",
  components: {
    AddIcon,
    SelectUser,
  },
  props: {
    flowList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    addNode() {
      this.visible = true;
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables.less";
.promote-flow-info {
  margin-top: 16px;
  .content {
    display: flex;
    padding: 32px 40px;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: @text-color-1;
      font-size: @font-size-xs;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: #f4f2f2;
        border-radius: @border-radius-50;
      }
      .name {
        margin-top: 3px;
      }
    }
  }
}
</style>
