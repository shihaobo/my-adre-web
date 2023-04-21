import router from "@/router";
import store from "@/store";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import api from "@/api/index.js";
import Cookies from "js-cookie";
import { getDAes } from "./utils/crypto-js";
import get from "lodash/get";
import { logOut } from "@/utils/utils.js";
import dayjs from "dayjs";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const whiteList = ["no-network", "no-permission", "404"];
  const { token, code } = to.query;
  const { pageTitle = "人事变动" } = to.meta;
  document.title = pageTitle;

  if (whiteList.includes(to.name)) {
    store.commit("common/SET_IS_SHOW_APP", true);
    return next();
  }

  if (token) {
    const tempToken = getDAes(decodeURIComponent(token));
    Cookies.set("token", tempToken, { expires: 1 });
    Cookies.set("hr-change-token", tempToken, { expires: 1 });
  }
  Cookies.set("loginType", "0", { expires: 1 });
  let tempToken = Cookies.get("hr-change-token");
  let expires = new Date(dayjs().add(2, "hour"));
  // 飞书登录
  if (to.name.includes("-flybook")) {
    if (code) {
      let params = { code };
      if (to.name.includes("not-staff-process")) {
        params.changeType = "2";
      }
      // 员工发起转正
      if (to.name.includes("staff-initiation-flybook")) {
        params.changeType = "3";
      }
      const { data } = await api.flyLogin(params);
      const { token, loginType } = data;
      Cookies.set("loginType", loginType, { expires });
      Cookies.set("token", token, { expires });
      Cookies.set("hr-change-token", token, { expires });
    } else {
      if (!tempToken) {
        return next("/no-permission");
      }
    }
  }

  // 支持外网
  if (location.host.includes("plus-a") && !to.name.includes("-oa")) {
    store.commit("common/SET_IS_SHOW_APP", true);
    if (whiteList.includes(to.name)) {
      return next();
    } else {
      return next("/404");
    }
  }

  //如果cookie中没有token信息跳转登录页
  if (!tempToken && !to.name.includes("-oa") && !to.name.includes("-flybook")) {
    logOut();
    return next(false);
  }
  // 页面权限;
  let authList = store.state.common.authList;
  let isShowApp = store.state.common.isShowApp;
  const auth = get(to, "meta.auth", "").split("_")[0];
  if (!authList && !to.name.includes("-oa")) {
    let bool = !to.name.includes("-flybook");
    await store.dispatch("common/setUserInfo", bool).catch(({ data }) => {
      if (data.code === 31602) {
        logOut();
        return next(false);
      }
    });
  }

  if (!isShowApp && to.name.includes("-oa")) {
    store.commit("common/SET_IS_SHOW_APP", true);
  }

  if (!auth || to.name.includes("-oa") || to.name.includes("-flybook")) {
    return next();
  } else {
    authList = store.state.common.authList;
    // 跳转到第一个页面;
    // if (to.name === "home" && authList.length > 0 && authList[0] !== "home") {
    //   return next(authList[0]);
    // }
    if (authList?.includes(auth)) {
      return next();
    } else {
      return next("/no-permission");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
