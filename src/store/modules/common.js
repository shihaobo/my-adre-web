import api from "@/api/index.js";

const state = {
  menuList: [], // 菜单列表
};

const getters = {};

const mutations = {
  SET_MENU_LIST(state, data) {
    state.menuList = data.data;
  },
};

const actions = {
  setMenuList({ commit }) {
    api.getMenuList().then((res) => {
      commit("SET_MENU_LIST", res);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
