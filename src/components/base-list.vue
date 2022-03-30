<template>
  <div class="base-list">
    <t-table
      rowKey="index"
      :bordered="true"
      :hover="true"
      :pagination="pagination"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-for="slot in Object.keys($scopedSlots)" #[slot]="{ col, row }">
        <slot :name="slot" v-bind="{ col, row }"></slot>
      </template>
    </t-table>
  </div>
</template>
<script>
export default {
  name: "base-list",
  props: {},
  data() {
    return {
      pagination: {
        current: 1,
        pageSize: 20,
        showJumper: true,
      },
    };
  },
  mounted() {
    console.log(this, "$slots");
  },
};
</script>

<style lang="less" scoped>
.base-list {
  padding: 0 32px 16px;
}
</style>
