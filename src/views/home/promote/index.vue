<template>
  <div class="promote-index">
    <base-info ref="baseInfo" @handle-name="handleName"></base-info>
    <leader-info ref="userInfo" :user-info="userInfo"></leader-info>
    <promote-info ref="promoteInfo"></promote-info>
    <salary-info ref="promoteInfo"></salary-info>
    <reason-info ref="reasonInfo"></reason-info>
    <letter-info ref="letterInfo"></letter-info>
    <flow-info ref="flowInfo"></flow-info>
    <div class="footer">
      <t-button theme="primary" @click="handleSubmit">提交</t-button>
      <t-button variant="outline" theme="primary">保存</t-button>
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
import BaseInfo from "./components/base-info.vue";
import LeaderInfo from "./components/leader-info.vue";
import PromoteInfo from "./components/promote-info.vue";
import SalaryInfo from "./components/salary-info.vue";
import ReasonInfo from "./components/reason-info.vue";
import LetterInfo from "./components/letter-info.vue";
import FlowInfo from "./components/flow-info.vue";

export default {
  name: "promote-index",
  components: {
    BaseInfo,
    LeaderInfo,
    PromoteInfo,
    SalaryInfo,
    ReasonInfo,
    LetterInfo,
    FlowInfo,
  },
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    handleName() {
      api.getUserInfo().then((res) => {
        this.userInfo = res.data;
      });
    },
    handleSubmit() {
      let formData = {};
      const queue = Object.keys(this.$refs).map((item) => {
        formData = { ...formData, ...this.$refs[item].formData };
        return this.$refs[item].handleSubmit();
      });
      Promise.all(queue).then((res) => {
        const bool = res.every((item) => {
          return item === true;
        });
        if (bool) {
          console.log(formData, "formData");
          this.$message.success("提交");
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.promote-index {
  .footer {
    margin-top: 40px;
    .t-button {
      width: 88px;
      margin-left: 20px;
    }
  }
}
</style>
