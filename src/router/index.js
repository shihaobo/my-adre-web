import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../components/layout";

import jobLibrary from "./modules/job-library.js";

const children = [].concat(jobLibrary);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
      ...children,
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
