import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", false, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules,
  plugins: [
    persistedState({
      storage: window.sessionStorage,
      reducer() {
        // reducer(val) {
        // const { change, examine } = val;
        // const { storeUser, eduInfo } = val["become-full"];
        return {
          // 需要缓存的vuex
          // change,
          // examine,
          // "batch-examine": val["batch-examine"],
          // "become-full": {
          //   storeUser,
          //   eduInfo,
          // },
        };
      },
    }),
  ],
});
