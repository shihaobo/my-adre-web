<template>
  <div class="select-user">
    <t-dialog :visible.sync="dialogVisible" :closeBtn="false" width="688px">
      <div class="left">
        <h3>{{ header }}</h3>
        <div class="content">
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
              <t-checkbox-group v-model="checkedValue">
                <t-checkbox v-for="item in options" :key="item.workNo" :value="item.workNo">
                  <span>{{ item.name }}</span>
                  <p>一级部门</p>
                </t-checkbox>
              </t-checkbox-group>
            </template>
          </t-popup>
          <t-tree
            v-if="!popVisible"
            ref="tree"
            :data="items"
            :checkable="true"
            hover
            activable
            :expand-on-click-node="true"
            v-model="treeCheckedValue"
            @change="onChange"
          />
        </div>
      </div>
      <div class="right">
        <h3>已添加：{{ treeCheckedValue.length }}</h3>
        <ul>
          <li v-for="(item, i) in treeCheckedData" :key="item.value">
            <span>{{ item.label }}</span>
            <close-icon @click="handleRemove(i)"></close-icon>
          </li>
        </ul>
      </div>
    </t-dialog>
  </div>
</template>
<script>
import debounce from "lodash/debounce";
import api from "@/api/index.js";
import { SearchIcon, CloseIcon } from "tdesign-icons-vue";
export default {
  name: "select-user",
  components: {
    SearchIcon,
    CloseIcon,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: "选择添加对象",
    },
  },
  data() {
    return {
      options: [],
      checkedValue: [],
      treeCheckedValue: [],
      treeCheckedData: [],
      treeFlatData: [],
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
    this.treeFlat(this.items);
  },
  mounted() {},
  methods: {
    handleSearch() {
      api.getUserInfos().then((res) => {
        this.options = res.data;
        console.log(this.options, "this.options");
      });
    },
    onChange() {
      this.treeCheckedData = this.treeFlatData.filter((item) => {
        return this.treeCheckedValue.includes(item.value);
      });
    },
    handleRemove(i) {
      this.treeCheckedValue.splice(i, 1);
      this.onChange();
    },
    treeFlat(data) {
      data.forEach((item) => {
        if (item.children) {
          this.treeFlat(item.children);
        } else {
          this.treeFlatData.push(item);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";
.select-user {
  /deep/ .t-dialog {
    padding: 0;
    h3 {
      height: 48px;
      line-height: 48px;
      padding: 0 24px;
      margin-bottom: 12px;
      font-weight: normal;
      color: @text-color;
      border-bottom: 1px solid @border-color;
    }
    .t-dialog__body {
      display: flex;
      padding: 0;
      .left {
        width: 388px;
        border-right: 5px solid @border-color;
        .content {
          padding: 0 24px;
        }
      }
      .right {
        flex: 1;
        ul {
          height: 292px;
          overflow: auto;
          li {
            display: flex;
            align-items: center;
            height: 40px;
            padding: 0 24px;
            span {
              flex: 1;
            }
            .t-icon-close {
              cursor: pointer;
            }
          }
        }
      }
    }
    .t-dialog__footer {
      padding: 24px;
      border-top: 1px solid @border-color;
    }
  }
}
.t-tree {
  padding: 10px 0;
  height: 260px;
  overflow: auto;
}
</style>
<style lang="less">
@import "@/style/variables";
.select-user-popup {
  max-height: 300px;
  overflow: auto;
  .t-checkbox-group {
    width: 100%;
    font-size: @font-size-s;
    .t-checkbox {
      display: flex;
      align-items: flex-start;
      padding: 8px;
      margin: 0;
      .t-checkbox__input {
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
