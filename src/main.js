import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TDesign from "tdesign-vue";
import globalComponents from "@/components/index";

import "tdesign-vue/es/style/index.css";
import "@/style/index.less";

Vue.use(TDesign).use(globalComponents);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
