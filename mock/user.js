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
          path: "home",
          icon: "home",
        },
        {
          id: 2,
          name: "岗位管理",
          path: "job",
          icon: "job",
          children: [
            {
              id: 3,
              name: "岗位库",
              path: "job-library",
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
          icon: "salary",
        },
        {
          id: 6,
          name: "审批配置",
          icon: "approve",
        },
      ],
    },
  },
  {
    url: "/cadre/getUserInfos",
    method: "post",
    proxy: true, // 是否使用mock代理
    response: {
      stat: 1,
      userInfoList: [
        {
          name: "姓名",
          workNo: "131456",
          post: "岗位",
          department: "部门",
        },
        {
          name: "张三",
          workNo: "456789",
          post: "ui工程师",
          department: "人力资源总部",
        },
      ],
    },
  },
  {
    url: "/cadre/getUserInfo",
    method: "post",
    proxy: true, // 是否使用mock代理
    response: {
      stat: 1,
      data: {
        age: "30",
        jixiao: "A",
        renqi: "10",
        siling: "10",
        xueli: "学历",
        yuan: "目标",
        dangji: "党员",
      },
    },
  },
];
