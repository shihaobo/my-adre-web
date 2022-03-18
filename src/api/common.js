import { get } from "../utils/http.js";

export default {
  getMenuList() {
    return get("/cadre/getMenuList");
  },
};
