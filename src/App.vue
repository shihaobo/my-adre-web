<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import _ from "lodash";

export default {
  data() {},
  computed: {},
  watch: {},
  mounted() {
    this.setMenuList();
    let fruitSamples = [
      { id: 1, type: "apples" },
      { id: 2, type: "bananas" },
      { id: 3, type: "pears" },
      { id: 1, type: "apples" },
    ];
    console.log(_(fruitSamples).flatten().groupBy("type"), "type");
  },
  methods: {
    ...mapActions("common", ["setMenuList"]),
  },
};
</script>
