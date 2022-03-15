import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../components/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
