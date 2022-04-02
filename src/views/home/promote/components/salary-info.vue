<template>
  <div class="promote-salary-info bg-white">
    <h3 class="second-title">薪酬信息</h3>
    <t-form :data="formData" :rules="rules" ref="form" layout="inline" labelWidth="100px">
      <t-form-item label="原年薪" name="annual">
        <t-input v-model="formData.annual" placeholder="-"></t-input>
      </t-form-item>
      <t-form-item label="调整后年薪" name="annualUp">
        <t-addon append="万">
          <t-input v-model="formData.annualUp" placeholder="-"></t-input>
        </t-addon>
      </t-form-item>
      <t-form-item label="薪酬类型" name="annualType">
        <t-radio-group v-model="formData.annualType">
          <t-radio value="1">年薪</t-radio>
          <t-radio value="2">协议薪酬</t-radio>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="拟任岗薪点表">
        <ul class="salary-table">
          <li>
            <p>1档</p>
            <p>1</p>
          </li>
          <li>
            <p>2档</p>
            <p>2</p>
          </li>
          <li>
            <p>3档</p>
            <p>3</p>
          </li>
        </ul>
      </t-form-item>
      <t-form-item label="协议部分" name="xieyi">
        <t-textarea v-model="formData.xieyi" placeholder="请输入内容" />
      </t-form-item>
      <t-form-item label="薪酬类型" name="annualType">
        <t-radio-group v-model="formData.annualType">
          <t-radio value="1">按协议暂不调薪</t-radio>
          <t-radio value="2">纳入套改</t-radio>
        </t-radio-group>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
export default {
  name: "promote-salary-info",
  data() {
    return {
      formData: {
        annual: "",
        annualUp: undefined,
        annualType: "",
      },
      rules: {
        annualType: [{ required: true, message: "请选择薪酬类型" }],
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
.promote-salary-info {
  margin-top: 16px;
  .t-form {
    display: flex;
    padding: 24px 36px;
    /deep/ .t-form__label {
      color: @text-color-1;
    }
    .t-form__item {
      margin-right: 0;
    }
    .t-form-item__annual {
      width: 50%;
      padding-right: 64px;
    }
    .t-form-item__annualUp {
      width: 50%;
      /deep/ .t-form__controls {
        width: 193px;
      }
    }
    .t-form-item__annualType {
      margin-right: 52px;
    }
    .salary-table {
      display: flex;
      border: 1px solid @border-color;
      border-right: none;
      li {
        width: 72px;
        text-align: center;
        border-right: 1px solid @border-color;
        p {
          line-height: 20px;
        }
        p:nth-child(1) {
          line-height: 22px;
          background: @bg-color;
          color: @brand-color;
        }
      }
    }
    .t-form-item__xieyi {
      width: 100%;
    }
  }
}
</style>
