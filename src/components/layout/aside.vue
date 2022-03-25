<template>
  <t-menu expandMutex height="550px" :collapsed="collapsed">
    <template v-for="item in menuList">
      <t-submenu v-if="item.children" :key="item.id" :title="item.name">
        <t-menu-item
          v-for="subItem in item.children"
          :key="subItem.id"
          :value="subItem.id"
          :to="subItem.path"
        >
          {{ subItem.name }}
        </t-menu-item>
      </t-submenu>
      <t-menu-item v-else :key="item.id" :value="item.id" :to="item.path">
        <template #icon>
          <icon name="user-circle" />
        </template>
        {{ item.name }}
      </t-menu-item>
    </template>
    <template #operations>
      <icon
        class="t-menu__operations-icon"
        name="view-list"
        @click.native="changeCollapsed"
      />
    </template>
  </t-menu>
</template>
<script>
import { mapState } from "vuex";
import { Icon } from "tdesign-icons-vue";

export default {
  name: "layout-aside",
  components: {
    Icon,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    ...mapState("common", ["menuList"]),
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";

.t-default-menu .t-menu__item.t-is-active:not(.t-is-opened) {
  background-color: @brand-color-1;
  color: @brand-color;
  .t-icon {
    color: @brand-color;
  }
}
</style>
