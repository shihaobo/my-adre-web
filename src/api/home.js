import { get } from "../utils/http.js";

export default {
  getProcessList() {
    return get("/cadre/cadreProcessList");
  },
  getApproverList() {
    return get("/cadre/approverList");
  },
};
