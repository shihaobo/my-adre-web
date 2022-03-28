export const flowItem = [
  {
    id: 1,
    active: false,
    title: "晋升",
    path: "/promote",
  },
];

export const filterData = {
  processType: {
    type: "select",
    value: "",
    placeholder: "",
    options: [
      {
        id: 1,
        name: "提名",
      },
      {
        id: 2,
        name: "晋升",
      },
      {
        id: 3,
        name: "平调",
      },
    ],
  },
  status: {
    type: "select",
    value: "",
    placeholder: "",
    options: [
      {
        id: 1,
        name: "流程中",
      },
      {
        id: 2,
        name: "草稿",
      },
      {
        id: 3,
        name: "结束",
      },
    ],
  },
  selectInput: {
    type: "selectInput",
    value: "",
    placeholder: "",
    selectValue: 1,
    options: [
      {
        id: 1,
        name: "标题",
      },
      {
        id: 2,
        name: "任免对象",
      },
      {
        id: 3,
        name: "流程编号",
      },
    ],
  },
};

export const columns = [
  {
    colKey: "title",
    title: "标题",
  },
  {
    colKey: "name",
    title: "任免对象",
  },
  {
    colKey: "processType",
    title: "流程类型",
  },
  {
    colKey: "status",
    title: "状态",
  },
  {
    colKey: "processNode",
    title: "当前节点",
  },
  {
    colKey: "processDealer",
    title: "当前处理人",
  },
  {
    colKey: "batchNo",
    title: "流程编号",
  },
  {
    colKey: "createTime",
    title: "创建时间",
  },
  {
    colKey: "operation",
    title: "操作",
    width: 300,
    fixed: "right",
    cell: "operation",
  },
];
