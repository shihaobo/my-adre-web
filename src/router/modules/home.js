const router = [
  {
    path: "home",
    name: "home",
    component: () => import("@/views/home/index/index.vue"),
    meta: { title: "首页" },
  },
  {
    path: "promote",
    name: "promote",
    component: () => import("@/views/home/promote/index.vue"),
    meta: { title: "晋升", isShowBack: true },
  },
];

export default router;
