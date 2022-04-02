<template>
  <div class="promote-reason-info bg-white">
    <h3 class="second-title">任免理由</h3>
    <t-form :data="formData" :rules="rules" ref="form" labelWidth="100px">
      <t-form-item label="理由类型" name="reasonType">
        <t-radio-group v-model="formData.reasonType">
          <t-radio value="1">业绩晋升</t-radio>
          <t-radio value="2">岗位需要</t-radio>
          <t-radio value="2">提前培养</t-radio>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="任免说明" name="des">
        <t-textarea v-model="formData.des" placeholder="请输入内容" />
      </t-form-item>
      <t-form-item label="生效日期" name="date">
        <t-date-picker
          v-model="formData.date"
          theme="primary"
          mode="date"
          clearable
          :disableDate="disableDate"
        ></t-date-picker>
      </t-form-item>
      <t-form-item label="附件" name="attachment">
        <t-upload
          v-model="files"
          action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
          theme="custom"
          multiple
        >
          <t-button theme="default" variant="outline">
            <add-icon slot="icon" />
            添加附件
          </t-button>
        </t-upload>
        <ul v-if="files && files.length" class="attachment">
          <li v-for="(item, index) in files" :key="index">
            {{ item.name }}
            <close-icon @click="removeFile(index)" />
          </li>
        </ul>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { AddIcon, CloseIcon } from "tdesign-icons-vue";

export default {
  name: "promote-reason-info",
  components: {
    AddIcon,
    CloseIcon,
  },
  data() {
    return {
      formData: {
        reasonType: "",
        des: "",
        date: "",
      },
      disableDate: { before: dayjs().format() },
      files: [],
      rules: {
        reasonType: [{ required: true, message: "请选择理由类型" }],
        des: [{ required: true, message: "请填写任免说明" }],
        date: [{ required: true, message: "请选择生效日期" }],
      },
    };
  },
  methods: {
    removeFile(i) {
      this.files.splice(i, 1);
    },
    handleSubmit() {
      return this.$refs.form.validate();
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables.less";
.promote-reason-info {
  margin-top: 16px;
  .t-form {
    padding: 24px 36px;
    /deep/ .t-form__label {
      color: @text-color-1;
    }
  }
  /deep/ .t-button__text {
    margin-left: 0;
  }
  .attachment {
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 0 12px;
      margin: 0 0 12px 18px;
      border: 1px solid @border-color-1;
      border-radius: @border-radius-s;
      /deep/ .t-icon {
        position: relative;
        top: 1px;
        margin-left: 6px;
        font-size: @font-size-base;
        cursor: pointer;
      }
    }
  }
  .t-form-item__attachment {
    /deep/ .t-form__controls-content {
      align-items: flex-start;
      // display: block;
    }
  }
}
</style>
