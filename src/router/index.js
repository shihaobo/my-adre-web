import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../components/layout";

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false });

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

router.beforeEach((to, from, next) => {
  console.log(to, from);
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
