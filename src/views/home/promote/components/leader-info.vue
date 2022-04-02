<template>
  <div class="promote-leader-info bg-white">
    <h3 class="second-title">
      <span>任命人信息</span>
      <t-button variant="text" theme="primary">一人一页</t-button>
    </h3>
    <div class="content">
      <div class="user">
        <img src="@/assets/avatar.png" alt="" />
        <p>小王也</p>
        <p>1008618</p>
      </div>
      <ul class="info">
        <li>
          <p>
            <span>年龄</span>
            <span>{{ userInfo.age }}</span>
          </p>
          <p>
            <span>近3年绩效</span>
            <span>{{ userInfo.jixiao }}</span>
          </p>
          <p>
            <span>原层级任期</span>
            <span>{{ userInfo.renqi }}</span>
          </p>
        </li>
        <li>
          <p>
            <span>司龄</span>
            <span>{{ userInfo.siling }}</span>
          </p>
          <p>
            <span>任职学历</span>
            <span>{{ userInfo.xueli }}</span>
          </p>
          <p>
            <span class="special">原岗级提升目标达成情况</span>
            <span>{{ userInfo.yuan }}</span>
          </p>
        </li>
        <li>
          <t-form :data="formData" :rules="rules" ref="form" layout="inline" labelWidth="auto">
            <p>
              <span>党籍情况</span>
              <span>{{ userInfo.dangji }}</span>
            </p>
            <p>
              <t-form-item label="入党申请书" name="partyCase">
                <t-radio-group v-model="formData.partyCase">
                  <t-radio value="1">是</t-radio>
                  <t-radio value="2">否</t-radio>
                </t-radio-group>
              </t-form-item>
            </p>
            <p>
              <t-form-item label="是否外籍" name="isForeign">
                <t-radio-group v-model="formData.isForeign">
                  <t-radio value="1">是</t-radio>
                  <t-radio value="2">否</t-radio>
                </t-radio-group>
              </t-form-item>
            </p>
          </t-form>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "promote-base-info",
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      formData: {
        partyCase: "",
        isForeign: "",
      },
      rules: {
        partyCase: [{ required: true, message: "请选择入党申请书" }],
        isForeign: [{ required: true, message: "请选择是否外籍" }],
      },
    };
  },
  methods: {
    handleSubmit() {
      return this.$refs.form.validate();
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables.less";
.promote-leader-info {
  margin-top: 16px;
  .second-title {
    display: flex;
    span {
      flex: 1;
    }
  }
  .content {
    display: flex;
    padding: 24px 36px;
    .user {
      width: 100px;
      height: 145px;
      text-align: center;
      border: 1px solid @border-color;
      border-radius: @border-radius-s;
    }
    .info {
      flex: 1;
      border-radius: @border-radius-s;
      border: 1px solid @border-color;
      border-bottom: none;
      li {
        display: flex;
        height: 48px;
        border-bottom: 1px solid @border-color;
        .t-form {
          width: 100%;
        }
        p {
          display: flex;
          width: 33%;
          span:nth-child(1),
          /deep/ .t-form__label {
            width: 150px !important;
            height: 47px;
            line-height: 47px;
            background: @bg-color-1;
            text-align: right;
            margin-right: 20px;
            padding-right: 24px;
            color: @text-color-1;
            &.special {
              padding: 4px 24px 4px 0;
              line-height: 20px;
            }
          }
          span:nth-child(2) {
            flex: 1;
            line-height: 47px;
          }
          /deep/ .t-form__controls-content {
            height: 47px;
          }
        }
      }
    }
  }
}
</style>
