const Mock = require("mockjs");

// const data = Mock.mock({
//   "items|30": [
//     {
//       id: "@id",
//       title: "@sentence(10, 20)",
//       "status|1": ["published", "draft", "deleted"],
//       author: "name",
//       display_time: "@datetime",
//       pageviews: "@integer(300, 5000)",
//     },
//   ],
// });

module.exports = [
  {
    url: "/api/userinfo",
    method: "get",
    proxy: true, // 是否使用mock代理
    response: {
      stat: 1,
      data: {
        name: "shihaobo",
        sex: "nan",
      },
    },
  },
  {
    url: "/cadre/getMenuList",
    method: "get",
    proxy: true, // 是否使用mock代理
    response: {
      stat: 1,
      data: [
        {
          id: 1,
          name: "首页",
          path: "/",
          icon: "dashboard",
        },
        {
          id: 2,
          name: "岗位管理",
          children: [
            {
              id: 3,
              name: "岗位库",
              path: "/job-library",
            },
            {
              id: 4,
              name: "岗级管理",
            },
          ],
        },
        {
          id: 5,
          name: "薪点配置",
        },
        {
          id: 6,
          name: "审批卑职",
        },
      ],
    },
  },
];
