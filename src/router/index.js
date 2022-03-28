import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../components/layout";

const modulesFiles = require.context("./modules", false, /\.js$/);
const children = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  return [...modules, ...value.default];
}, []);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    redirect: "/home",
    component: Layout,
    children,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
