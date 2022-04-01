<template>
  <div class="promote-base-info bg-white">
    <h3 class="second-title">任免信息</h3>
    <t-form :data="formData" :rules="rules" ref="form" layout="inline" labelWidth="auto">
      <t-form-item label="任免人" name="name">
        <select-remote @change="handleName"></select-remote>
      </t-form-item>
      <t-form-item label="提名人" name="nominee">
        <select-remote @change="handleNominee"></select-remote>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import api from "@/api/index.js";
import SelectRemote from "@/components/select-remote.vue";

export default {
  name: "promote-base-info",
  components: {
    SelectRemote,
  },
  data() {
    return {
      formData: {
        name: "",
        nominee: "",
      },
      options: [],
      rules: {
        name: [{ required: true, message: "请填写任免人" }],
        nominee: [{ required: true, message: "请填写提名人" }],
      },
    };
  },
  methods: {
    getUserList() {
      api.getUserInfos().then((res) => {
        this.options = res.userInfoList;
      });
    },
    handleName(value) {
      this.formData.name = value;
      this.$emit("handle-name", value);
    },
    handleNominee(value) {
      this.formData.nominee = value;
    },
    handleSubmit() {
      return this.$refs.form.validate();
    },
  },
};
</script>
<style lang="less" scoped>
.promote-base-info {
  .t-form {
    padding: 24px 36px;
    .t-form__item {
      margin-right: 120px;
    }
    /deep/ .select-remote {
      width: 463px;
    }
  }
}
</style>
