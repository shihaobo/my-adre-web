const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      title: "@sentence(10, 20)",
      "status|1": ["published", "draft", "deleted"],
      author: "name",
      display_time: "@datetime",
      pageviews: "@integer(300, 5000)",
    },
  ],
});

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
    url: "/api/list",
    method: "get",
    proxy: true, // 是否使用mock代理
    response: {
      stat: 1,
      data: [
        {
          id: 1,
          name: "shi",
        },
      ],
    },
  },
  {
    url: "/api/list111",
    method: "get",
    proxy: true, // 是否使用mock代理
    response: {
      stat: 1,
      data: data,
    },
  },
];
