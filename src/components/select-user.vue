<template>
  <div class="select-user">
    <t-select
      v-model="val"
      filterable
      clearable
      :placeholder="placeholder"
      :onSearch="getUserList"
      :loading="loading"
      :popupProps="{
        overlayClassName: 'select-user-popup',
      }"
      v-on="$listeners"
    >
      <t-option
        v-for="item in options"
        :value="item.workNo"
        :label="`${item.name}（${item.workNo}）`"
        :key="item.workNo"
      >
        <div>
          <p>
            {{ item.name }}
            <span>（{{ item.workNo }}）</span>
          </p>
          <p class="des">{{ item.post }}</p>
          <p class="des">{{ item.department }}</p>
        </div>
      </t-option>
    </t-select>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  name: "select-user",
  props: {
    placeholder: {
      type: String,
      default: "姓名或工号搜索",
    },
  },
  data() {
    return {
      val: "",
      loading: false,
      options: [],
    };
  },
  mounted() {},
  methods: {
    getUserList() {
      api.getUserInfos().then((res) => {
        this.options = res.userInfoList;
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";
.select-user-popup {
  .t-select-option {
    height: auto;
    .des {
      font-size: @font-size-xs;
      color: @text-color-1;
    }
  }
}
</style>
