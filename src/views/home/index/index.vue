<template>
  <div class="home">
    <div class="select-flow">
      <h3>选择流程<i class="iconfont icon-a-3"></i></h3>
      <ul>
        <li
          v-for="item in flowItem"
          :key="item.id"
          :class="{ active: item.active }"
          @mouseover="item.active = true"
          @mouseout="item.active = false"
          @click="handleFlow(item)"
        >
          <img :src="require(`@/assets/home-icon${item.id}.png`)" />
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <div class="flow-list">
      <h3>选择流程</h3>
      <div class="flow-list-content">
        <base-filter :filter-data="filterData" @handle-search="handleSearch" />
        <base-list :columns="columns" :data="tableData">
          <template #status>
            <t-tag theme="danger" variant="light">审批中</t-tag>
          </template>
          <template #operation>
            <t-button variant="text" theme="primary">编辑</t-button>
            <t-button variant="text" theme="primary">删除</t-button>
          </template>
        </base-list>
      </div>
    </div>
  </div>
</template>

<script>
import { flowItem, filterData, columns } from "./config/index";
import api from "@/api/index.js";

export default {
  name: "home-index",
  data() {
    return {
      flowItem,
      filterData,
      columns,
      tableData: [],
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    handleFlow(item) {
      this.$router.push({
        path: item.path,
      });
    },
    getList() {
      api.home.getProcessList().then((res) => {
        this.tableData = res.data.list;
      });
    },
    handleSearch() {
      console.log("查询");
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";

h3 {
  padding: 0 32px 8px;
  font-size: 28px;
  font-weight: 500;
  border-bottom: 1px solid @border-color;
}
.select-flow {
  padding: 16px 0 32px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 20px;
  ul {
    display: flex;
    padding: 32px 32px 0;
    li {
      width: 130px;
      text-align: center;
      &.active {
        color: @brand-color;
      }
      img {
        width: 130px;
        height: 130px;
      }
    }
  }
}
.flow-list {
  background: #fff;
  border-radius: 6px;
  // &-content {
  //   padding: 0 32px;
  // }
}
</style>
