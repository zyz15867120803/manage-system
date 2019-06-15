import * as types from './mutations-types';

const mutations = {
  [types.SET_SIDER_COLLAPSED](state, isCollapsed) {
    state.isCollapsed = isCollapsed;
  },
  [types.SET_ACTIVE_MENUNAME](state, activeMenuName) {
    state.activeMenuName = activeMenuName;
  },
  [types.SET_TAGS](state, tags) {
    state.tags = tags;
  },
  [types.SET_USER](state, {id, name = '', userName, message = ''}) {
    state.user = {
      id,
      name,
      username: userName,
      message
    };
  },
  [types.SET_THEME](state, theme) {
    state.theme = theme;
  }
};

export default mutations;
