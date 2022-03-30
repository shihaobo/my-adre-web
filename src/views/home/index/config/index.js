export const flowItem = [
  {
    id: 1,
    active: false,
    title: "晋升",
    path: "/promote",
  },
  {
    id: 2,
    active: false,
    title: "提名",
    path: "",
  },
  {
    id: 3,
    active: false,
    title: "平调",
    path: "",
  },
  {
    id: 4,
    active: false,
    title: "调任",
    path: "",
  },
  {
    id: 5,
    active: false,
    title: "兼职",
    path: "",
  },
  {
    id: 6,
    active: false,
    title: "停职",
    path: "",
  },
  {
    id: 7,
    active: false,
    title: "免职",
    path: "",
  },
  {
    id: 8,
    active: false,
    title: "关键岗外引发文",
    path: "",
  },
  {
    id: 9,
    active: false,
    title: "多流程发起",
    path: "",
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
