module.exports = [
  {
    url: "/cadre/cadreProcessList",
    method: "get",
    proxy: true, // 是否使用mock代理
    response: {
      stat: 1,
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
];
