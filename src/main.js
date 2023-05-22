import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import TDesign from "tdesign-vue";
import globalComponents from "@/components/index";

import directive from "./directive";
import dayjs from "dayjs";
import "./permission";

import "tdesign-vue/es/style/index.css";
import "@/style/index.less";
import Bus from "./utils/bus";

Vue.use(TDesign).use(globalComponents).use(directive);

Vue.config.productionTip = false;
Vue.prototype.dayjs = dayjs;
Vue.prototype.$bus = Bus;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
