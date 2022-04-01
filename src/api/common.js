import { get, post } from "../utils/http.js";

export default {
  getMenuList() {
    return get("/cadre/getMenuList");
  },
  getUserInfos() {
    return post("/cadre/getUserInfos");
  },
  getUserInfo() {
    return post("/cadre/getUserInfo");
  },
};
