<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    this.setMenuList();
  },
  methods: {
    ...mapActions("common", ["setMenuList"]),
  },
};
</script>
