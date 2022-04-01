<template>
  <div class="promote-promote-info bg-white">
    <h3 class="second-title">
      <span>晋升前</span>
      <span>晋升后</span>
    </h3>
    <t-form :data="formData" :rules="rules" ref="form" labelWidth="100px">
      <div class="form-item">
        <t-form-item label="原岗位" name="originPost">
          <t-input v-model="formData.originPost" placeholder="-"></t-input>
        </t-form-item>
        <t-form-item label="原岗级" name="originPostLevel">
          <t-input v-model="formData.originPostLevel" placeholder="-"></t-input>
        </t-form-item>
        <t-form-item label="原岗级层级" name="originPostTierLevel">
          <t-input v-model="formData.originPostTierLevel" placeholder="-"></t-input>
        </t-form-item>
        <t-form-item label="原职级" name="beforeAdjust">
          <t-input v-model="formData.beforeAdjust" placeholder="-"></t-input>
        </t-form-item>
      </div>
      <div class="form-item">
        <t-form-item label="拟任岗位" name="appointPost">
          <t-select v-model="formData.appointPost" :options="options1" placeholder="请选择" />
        </t-form-item>
        <t-form-item label="拟任岗级" name="appointPostLevel">
          <t-select v-model="formData.appointPostLevel" :options="options1" placeholder="请选择" />
        </t-form-item>
        <t-form-item label="拟任岗级层级" name="appointPostTierLevel">
          <t-input v-model="formData.appointPostTierLevel" placeholder="-"></t-input>
        </t-form-item>
        <t-form-item label="拟任职级" name="afterAdjust">
          <t-input v-model="formData.afterAdjust" placeholder="-"></t-input>
        </t-form-item>
      </div>
    </t-form>
  </div>
</template>
<script>
export default {
  name: "promote-promote-info",
  data() {
    return {
      formData: {
        originPost: "",
        originPostLevel: "",
        originPostTierLevel: "",
        beforeAdjust: "",
        appointPost: "",
        appointPostLevel: "",
        appointPostTierLevel: "",
        afterAdjust: "",
      },
      options1: [],
      rules: {
        name: [{ required: true, message: "请填写任免人" }],
        nominee: [{ required: true, message: "请填写提名人" }],
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
.promote-promote-info {
  margin-top: 12px;
  .second-title {
    display: flex;
    span {
      flex: 1;
    }
  }
  .t-form {
    display: flex;
    padding: 24px 36px;
    .form-item {
      flex: 1;
      padding-right: 64px;
      /deep/ .t-form__label {
        color: @text-color-1;
      }
    }
  }
}
</style>
