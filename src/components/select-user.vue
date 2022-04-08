<template>
  <div class="select-user">
    <t-dialog
      :header="header"
      :visible.sync="dialogVisible"
      @confirm="handleOk"
      @close="handleClose"
    >
      <div slot="body">
        <t-popup
          :visible="popVisible"
          overlayClassName="select-user-popup"
          :overlayStyle="(elem) => ({ width: `${elem.offsetWidth}px` })"
          trigger="focus"
          placement="bottom"
        >
          <t-input placeholder="请输入" clearable @change="handleSearch">
            <search-icon slot="suffix-icon"></search-icon>
          </t-input>
          <template #content>
            <t-checkbox-group v-model="value">
              <t-checkbox v-for="item in options" :key="item.workNo" :value="item.workNo">
                <span>{{ item.name }}</span>
                <p>一级部门</p>
              </t-checkbox>
            </t-checkbox-group>
          </template>
        </t-popup>
        <t-tree
          v-if="!popVisible"
          :data="items"
          hover
          :checkable="checkable"
          :check-strictly="checkStrictly"
          :value-mode="valueMode"
          @change="onChange"
          @click="onClick"
        />
      </div>
    </t-dialog>
  </div>
</template>
<script>
import debounce from "lodash/debounce";
import api from "@/api/index.js";
import { SearchIcon } from "tdesign-icons-vue";
export default {
  name: "select-user",
  components: {
    SearchIcon,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: "选择审批人",
    },
  },
  data() {
    return {
      options: [],
      value: [],
      checkable: true,
      checkStrictly: false,
      valueMode: "onlyLeaf",
      items: [
        {
          value: "1",
          label: "1",
          children: [
            {
              value: "1.1",
              label: "1.1",
              children: [
                {
                  value: "1.1.1",
                  label: "1.1.1",
                  children: [
                    {
                      value: "1.1.1.1",
                      label: "1.1.1.1",
                    },
                    {
                      value: "1.1.1.2",
                      label: "1.1.1.2",
                    },
                  ],
                },
                {
                  value: "1.1.2",
                  label: "1.1.2",
                  children: [
                    {
                      value: "1.1.2.1",
                      label: "1.1.2.1",
                    },
                    {
                      value: "1.1.2.2",
                      label: "1.1.2.2",
                    },
                  ],
                },
              ],
            },
            {
              value: "1.2",
              label: "1.2",
              children: [
                {
                  value: "1.2.1",
                  label: "1.2.1",
                  children: [
                    {
                      value: "1.2.1.1",
                      label: "1.2.1.1",
                    },
                    {
                      value: "1.2.1.2",
                      label: "1.2.1.2",
                    },
                  ],
                },
                {
                  value: "1.2.2",
                  label: "1.2.2",
                  children: [
                    {
                      value: "1.2.2.1",
                      label: "1.2.2.1",
                    },
                    {
                      value: "1.2.2.2",
                      label: "1.2.2.2",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: "2",
          label: "2",
          children: [
            {
              value: "2.1",
              label: "2.1",
            },
            {
              value: "2.2",
              label: "2.2",
            },
          ],
        },
      ],
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    popVisible() {
      return this.options.length > 0;
    },
  },
  created() {
    this.handleSearch = debounce(this.handleSearch, 600);
  },
  mounted() {},
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleOk() {
      this.dialogVisible = false;
    },
    handleSearch() {
      api.getUserInfos().then((res) => {
        this.options = res.data;
        console.log(this.options, "this.options");
      });
    },
    onClick(context) {
      console.info("onClick:", context);
    },
    onChange(checked, context) {
      console.info("onChange:", checked, context);
    },
  },
};
</script>
<style lang="less" scoped>
.t-tree {
  padding: 10px 0;
}
</style>
<style lang="less">
@import "@/style/variables";
.select-user-popup {
  width: 100%;
  .t-checkbox-group {
    width: 100%;
    font-size: @font-size-s;
    .t-checkbox {
      display: flex;
      align-items: flex-start;
      padding: 8px;
      /deep/ .t-checkbox__input {
        margin-top: 3px;
      }
      p {
        font-size: @font-size-xs;
        color: @text-color-1;
      }
    }
    .t-checkbox:hover {
      background-color: @bg-color;
    }
  }
}
</style>
