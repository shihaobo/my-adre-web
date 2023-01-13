<template>
  <t-select
    :value="value"
    :minCollapsedNum="6"
    placeholder="请输入搜索"
    :multiple="multiple"
    class="async-select"
    :popupProps="{
      overlayClassName: 'async-select-popup',
      onScroll: handlescroll,
    }"
    :filterable="!multiple"
    @search="searchSingle"
    @change="change"
    v-bind="selectProps"
    v-on="listeners"
  >
    <!--多选搜索-->
    <div slot="panelTopContent" v-if="multiple" style="height: 40px">
      <div class="async-input">
        <t-input
          v-model="input"
          :clearable="true"
          @change="onChange"
          @blur="blur"
          v-bind="inputProps"
        />
      </div>
    </div>
    <t-option v-for="item in options" :value="item.value" :label="item.label" :key="item.value">
      <!-- 展示内容 -->
      <slot :option="item">
        <hr-person :msg="item" />
      </slot>
    </t-option>
    <!--缓存options-->
    <t-option
      v-for="item in extraOptions"
      :value="item.value"
      :label="item.label"
      :key="item.value"
      class="cache-option"
    ></t-option>
    <div slot="panelBottomContent" class="select-panel-footer">
      <div class="load-more" v-show="loading">
        <t-loading :loading="loading" text="数据加载中..." size="small" />
      </div>
      <div class="no-load-more" v-show="!loadMore && page !== 1">没有更多数据了~</div>
    </div>
    <div slot="empty" class="select-empty">
      {{ emptyTips }}
    </div>
    <!--插槽-->
    <template v-for="slot in Object.keys(scopedSlots)" #[slot]="{ col, row }">
      <slot :name="slot" v-bind="{ col, row }"></slot>
    </template>
  </t-select>
</template>

<script>
import debounce from "lodash/debounce";
import HrPerson from "./person.vue";

export default {
  name: "hr-select-async",
  data() {
    return {
      currentVal: this.multiple ? [] : "", //当前存储的值
      options: [],
      input: "",
      page: 1,
      loading: false, //loadMore loading
      loadMore: true, //是否加载更多
      cacheOptions: [], //缓存的options
      extraOptions: [], //回显的不存在的options
    };
  },
  components: {
    HrPerson,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: [String, Array],
    },
    onSearch: {
      type: Function,
      required: true,
      default: () => {
        return new Promise(() => {});
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    inputProps: {
      type: Object,
      required: false,
      default: () => {
        return {
          placeholder: "姓名和工号搜索",
        };
      },
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    emptyTips: {
      type: String,
      default: "如需批量搜索，可用“；”分割，如：128282；182882；张三",
    },
  },
  computed: {
    selectProps() {
      /* eslint-disable no-unused-vars */
      const { onSearch, inputProps, total, ...rest } = this.$attrs;
      return rest;
    },
    listeners() {
      const { change, ...rest } = this.$listeners;
      return rest;
    },
    scopedSlots() {
      const { default: defaultFun, ...rest } = this.$scopedSlots;
      return rest;
    },
  },
  created() {
    this.getData();
  },

  methods: {
    //单选搜索
    searchSingle(val) {
      this.input = val;
      this.onChange();
    },
    //多选搜索
    onChange() {
      this.cache();
      this.page = 1;
      this.loadMore = true;
      debounce(this.getData, 300)();
    },
    //异步获取数据
    getData() {
      const params = { page: this.page, value: this.input };
      this.onSearch(params)
        .then((res) => {
          if (Array.isArray(res)) {
            this.options = this.page === 1 ? [...res] : [...this.options, ...res];
            this.cache();
            if (this.options.length >= Number(this.total)) {
              this.loadMore = false;
            }
          }
        })
        .catch(() => {
          this.page = 1;
          this.options = [];
          this.cache();
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //滚动加载
    handlescroll({ e }) {
      const { scrollTop, scrollHeight, clientHeight } = e.target || {};
      if (scrollHeight - scrollTop - clientHeight < 50) {
        debounce(() => {
          if (!this.loadMore) return;
          this.page++;
          if (this.options.length) {
            this.loading = true;
          }
          this.getData();
        }, 300)();
      }
    },
    blur() {
      this.input = "";
    },
    //存储已缓存的options
    cache() {
      const { currentVal } = this;
      const totalOptions = [...this.options];
      this.cacheOptions.forEach((item) => {
        const index = totalOptions.findIndex((t) => t.value === item.value);
        if (index === -1) {
          totalOptions.push(item);
        }
      });
      this.cacheOptions = totalOptions.filter((item) => {
        return this.multiple ? currentVal.includes(item.value) : currentVal === item.value;
      });
      const optionsAllVal = this.options.map((item) => item.value);
      this.extraOptions = this.cacheOptions.filter((item) => !optionsAllVal.includes(item.value));
    },
    change(val) {
      this.currentVal = val;
      this.cache();
      this.$emit("change", val);
    },
  },
};
</script>
<style lang="less">
.async-select-popup {
  position: relative;
}
</style>
<style lang="less" scoped>
.async-select-popup {
  .t-select-option {
    display: flex;
    align-items: center;
    height: auto;
    min-height: 28px;
    &:hover {
      background: #ecf2fe;
    }
  }
  .cache-option {
    padding: 0;
    margin: 0;
    height: 0;
  }
}

.no-load-more {
  padding: 10px 0;
  text-align: center;
  color: #999;
  font-size: 12px;
}
.async-input {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 8px;
  width: 100%;
  padding: 6px 16px 10px;
  background-color: #fff;
}
.load-more {
  text-align: center;
  widows: 100%;
  padding: 20px 0;
}
.select-empty {
  padding: 60px 0;
}
</style>
