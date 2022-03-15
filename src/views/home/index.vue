<template>
  <div class="home">1111</div>
</template>

<script>
import api from "@/api/index.js";
import axios from "axios";

export default {
  name: "home-index",
  created() {
    api.common.getMenuData();

    axios.get("/api/userinfo").then((res) => {
      console.log(res);
    });
    axios.get("/api/list").then((res) => {
      console.log(res);
    });
  },
};
</script>
