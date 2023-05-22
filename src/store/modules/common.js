import api from "@/api/index.js";

const state = {
  isShowApp: false,
  userInfo: {}, //用户信息
  menuList: [], // 菜单列表
  authList: null, //用于权限判断
  baseData: [], //基础枚举值
  globalLoading: 0, //全局loading
  oaSignData: {}, //oa签名
  viewWidth: 0, //视口宽度
  viewHeight: 0, //视口高度
};

const getters = {};

const mutations = {
  SET_IS_SHOW_APP(state, data) {
    state.isShowApp = data;
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  SET_MENU_LIST(state, data) {
    state.menuList = data;
  },
  SET_AUTH_LIST(state, data) {
    state.authList = data;
  },
  SET_BASE_DATA(state, data) {
    state.baseData = data;
  },
  SET_GLOBAL_LOADING(state, bool) {
    if (bool) {
      ++state.globalLoading;
    }
    if (!bool && state.globalLoading > 0) {
      --state.globalLoading;
    }
  },
  SET_OA_SIGN_DATA(state, data) {
    state.oaSignData = data;
  },
  SET_VIEW_HEIGHT(state, data) {
    state.viewWidth = data.w;
    state.viewHeight = data.h;
  },
};

const actions = {
  async setUserInfo({ commit }) {
    await api.getUserInfo().then((res) => {
      commit("SET_USER_INFO", res?.data);
    });
    await api.getMenuList({}).then((res) => {
      commit("SET_MENU_LIST", res?.data);
      commit("SET_AUTH_LIST", getAuthList([], res?.data));
    });
    // await dispatch("setBaseData");
    commit("SET_IS_SHOW_APP", true);
  },
  setGlobalLoading({ commit }, bool) {
    commit("SET_GLOBAL_LOADING", bool);
  },
  setOaSignData({ commit }, data) {
    commit("SET_OA_SIGN_DATA", data);
  },
  setViewHeight({ commit }, data) {
    commit("SET_VIEW_HEIGHT", data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

// 提取url，用于权限判断
function getAuthList(arr, data) {
  data.forEach((item) => {
    if (item.childMenu) {
      getAuthList(arr, item.childMenu);
    } else {
      arr.push(item.menuUrl);
    }
  });
  return arr;
}
