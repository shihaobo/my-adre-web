import { get } from "../utils/http.js";

export default {
  getMenuData() {
    return get("/api/list11122", {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      name: "12312",
    });
  },
};
