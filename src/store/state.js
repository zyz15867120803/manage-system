import {loadTheme} from 'common/js/cache';

const state = {
  isCollapsed: true,
  activeMenuName: 'home',
  tags: [],
  user: {},
  theme: loadTheme()
};

export default state;
