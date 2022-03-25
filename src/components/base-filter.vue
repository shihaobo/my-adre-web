<template>
  <div class="base-filter">
    <t-form :data="formData" layout="inline" ref="form" labelWidth="0">
      <t-form-item v-for="(item, key) in filterData" :key="key">
        <!-- 下拉框 -->
        <t-select
          v-if="item.type === 'select'"
          v-model="item.value"
          :options="item.options"
          :placeholder="item.placeholder"
          :keys="{ label: 'name', value: 'id' }"
          @change="handleSearch"
        />
        <!-- 输入框 -->
        <t-input
          v-if="item.type === 'input'"
          v-model="item.value"
          :placeholder="item.placeholder"
          @change="handleInput"
        >
          <search-icon slot="suffix-icon"></search-icon>
        </t-input>
        <!-- 下拉输入 -->
        <t-input-group v-if="item.type === 'selectInput'">
          <t-select
            v-model="item.selectValue"
            :options="item.options"
            :keys="{ label: 'name', value: 'id' }"
          />
          <t-input
            v-model="item.value"
            :placeholder="item.placeholder"
            @change="handleInput"
          >
            <search-icon slot="suffix-icon"></search-icon>
          </t-input>
        </t-input-group>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import debounce from "lodash/debounce";
import { SearchIcon } from "tdesign-icons-vue";
export default {
  name: "base-filter",
  components: {
    SearchIcon,
  },
  props: {
    filterData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  created() {
    this.handleInput = debounce(this.handleInput, 600);
  },
  methods: {
    handleInput() {
      this.handleSearch();
    },
    handleSearch() {
      const data = {};
      for (let key in this.filterData) {
        const temp = this.filterData[key];
        switch (temp.type) {
          case "selectInput":
            data[temp.selectValue] = temp.value;
            break;
          default:
            data[key] = temp.value;
        }
      }
      this.$emit("handle-search", data);
    },
  },
};
</script>
<style lang="less" scoped>
.base-filter {
  padding: 16px 32px;
}
</style>
