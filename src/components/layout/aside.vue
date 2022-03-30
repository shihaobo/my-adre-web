<template>
  <t-menu :expandMutex="false" :collapsed="collapsed" :value="active">
    <template v-for="item in menuList">
      <t-submenu v-if="item.children" :key="item.id" :title="item.name" :value="item.path">
        <template #icon>
          <i :class="['iconfont', `icon-${item.icon}`]"></i>
        </template>
        <t-menu-item
          v-for="subItem in item.children"
          :key="subItem.id"
          :value="subItem.path"
          :to="subItem.path"
        >
          {{ subItem.name }}
        </t-menu-item>
      </t-submenu>
      <t-menu-item v-else :key="item.id" :value="item.path" :to="item.path">
        <template #icon>
          <i :class="['iconfont', `icon-${item.icon}`]"></i>
        </template>
        {{ item.name }}
      </t-menu-item>
    </template>
    <template #operations>
      <icon class="t-menu__operations-icon" name="view-list" @click.native="changeCollapsed" />
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
    active() {
      const { name } = this.$route;
      return name;
    },
    // expanded() {
    //   const { name } = this.$route;
    //   const val = name.split("-");
    //   return val.slice(0, -1);
    // },
  },
  methods: {
    changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
<style lang="less" scoped>
.iconfont {
  margin-right: 8px;
}
</style>
