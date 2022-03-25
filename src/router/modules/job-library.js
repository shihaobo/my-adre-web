const router = [
  {
    path: "/job-library",
    name: "job-library",
    component: () => import("@/views/job-manage/job-library/index.vue"),
  },
];

export default router;
