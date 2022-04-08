<template>
  <!-- 远程搜索用户或者其他 -->
  <div class="select-remote">
    <t-select
      v-model="val"
      filterable
      clearable
      :placeholder="placeholder"
      :onSearch="getUserList"
      :loading="loading"
      :popupProps="{
        overlayClassName: 'select-remote-popup',
      }"
      v-on="$listeners"
    >
      <t-option
        v-for="item in options"
        :value="item[keys.value] || item.workNo"
        :label="item[keys.label] || `${item.name}（${item.workNo}）`"
        :key="item.workNo"
      >
        <div v-if="!isSlot">
          <p>
            {{ item.name }}
            <span>（{{ item.workNo }}）</span>
          </p>
          <p class="des">{{ item.post }}</p>
          <p class="des">{{ item.department }}</p>
        </div>
        <div v-else>
          <slot v-bind="item"></slot>
        </div>
      </t-option>
    </t-select>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  name: "select-remote",
  props: {
    placeholder: {
      type: String,
      default: "姓名或工号搜索",
    },
    // 枚举的label和value
    keys: {
      type: Object,
      default() {
        return {
          label: "",
          value: "",
        };
      },
    },
    // 获取枚举的api
    method: {
      type: String,
      default: "getUserInfos",
    },
  },
  data() {
    return {
      val: "",
      loading: false,
      options: [],
    };
  },
  computed: {
    isSlot() {
      return Object.keys(this.$scopedSlots).length > 0;
    },
  },
  mounted() {},
  methods: {
    getUserList() {
      api[this.method]().then((res) => {
        this.options = res.data;
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";
.select-remote-popup {
  .t-select-option {
    height: auto;
    .des {
      font-size: @font-size-xs;
      color: @text-color-1;
    }
  }
}
</style>
