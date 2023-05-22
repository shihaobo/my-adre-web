module.exports = [
  {
    url: "/cadre/cadreProcessList",
    method: "get",
    proxy: true, // 是否使用mock代理
    response: {
      code: 200,
      data: {
        list: [
          {
            title: "标题",
            name: "任免对象",
            processType: "流程类型",
            status: "状态",
            processNode: "当前节点",
            processDealer: "当前处理人",
            batchNo: "流程编号",
            createTime: "创建时间",
          },
        ],
      },
    },
  },
  {
    url: "/cadre/approverList",
    method: "get",
    proxy: true, // 是否使用mock代理
    response: {
      code: 200,
      data: [
        {
          id: 1,
          name: "刘强东",
          flow: "一级岗",
        },
        {
          id: 2,
          name: "李想",
          flow: "分管董事",
        },
        {
          id: 3,
          name: "马上",
          flow: "董事",
        },
      ],
    },
  },
];
