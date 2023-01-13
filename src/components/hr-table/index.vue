<template>
  <t-table
    :hover="true"
    :loading="loading"
    :loadingProps="{ size: '56px' }"
    :pagination="pagination.total ? pagination : null"
    @page-change="onPageChange"
    v-bind="tableAttrs"
    v-on="$listeners"
    :class="['table-search', ...tableAttrs.class]"
  >
    <template v-for="slot in Object.keys($scopedSlots)" #[slot]="{ col, row }">
      <slot :name="slot" v-bind="{ col, row }"></slot>
    </template>
    <template #empty>
      <div class="no-result">
        <img src="./images/empty.png" alt="" />
        <p>暂无数据</p>
      </div>
    </template>
  </t-table>
</template>

<script>
import { isValidVal } from "@/utils/utils.js";
const defaultPagination = {
  current: 1,
  pageSize: 20,
  pageSizeOptions: [
    { label: "10 条/页", value: 10 },
    { label: "20 条/页", value: 20 },
    { label: "30 条/页", value: 30 },
    { label: "50 条/页", value: 50 },
  ],
  total: 0,
  showJumper: true,
};
export default {
  name: "hr-table",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: true,
    },
    api: {
      type: String,
      required: false,
      default: "",
    },
    request: {
      type: Function || null,
      required: false,
      default: null,
    },
    params: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    handleParams: {
      type: Function || null,
      required: false,
      default: null,
    },
    handleTableData: {
      type: Function || null,
      required: false,
      default: null,
    },
    // 首次是否加载数据
    isFirst: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      tableData: [],
      pagination: { ...defaultPagination },
      loading: false,
    };
  },
  created() {
    if (this.isFirst) {
      this.getData();
    }
  },
  computed: {
    //属性
    tableAttrs() {
      return {
        data: this.tableData,
        ...this.$attrs,
      };
    },
    //事件
    //slot
  },
  watch: {
    params: {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },
  methods: {
    //请求数据前
    getData() {
      const { api, request, open } = this.$props;
      if (open && api && request) {
        this.pagination.current = 1;
        this.getTableData();
      }
    },
    //获取表格数据
    async getTableData() {
      const { handleParams, handleTableData, request, api, params } = this.$props;
      const { current, pageSize } = this.pagination;
      //基础参数
      const bparams = { ...params, limit: pageSize, page: current };
      //处理请求参数
      const tparams = handleParams ? handleParams(bparams) : bparams;
      this.loading = true;
      try {
        const res = await request(api, tparams);
        const { list, total } = res.data || {};
        //处理table结果
        let tData = handleTableData ? handleTableData(list) : list || [];
        this.tableData = tData.map((item) => {
          for (let key in item) {
            if (!isValidVal(item[key])) {
              item[key] = "-";
            }
          }
          return item;
        });
        this.pagination = {
          ...this.pagination,
          total,
        };
      } catch {
        console.error("接口错误");
      } finally {
        this.loading = false;
      }
    },
    //页面发生变化
    onPageChange(pageInfo) {
      this.pagination = {
        ...this.pagination,
        ...pageInfo,
      };
      this.getTableData();
    },
  },
};
</script>

<style lang="less">
.table-search.t-table th,
.table-search.t-table td {
  min-width: 120px;
  width: 120px;
}
</style>

<style lang="less" scoped>
@import "@/style/variables";
/deep/ .t-button--variant-text {
  padding: 0;
  margin-right: 12px;
}
/deep/ .t-table__empty {
  height: 300px;
}
/deep/ .t-table__empty-row {
  background-color: #fff !important;
}
.no-result {
  text-align: center;
  img {
    width: 244px;
    height: 174px;
    margin-bottom: 12px;
  }
  p {
    color: @text-color-1;
  }
}
</style>
