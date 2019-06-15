import * as types from './mutations-types';
import {setTheme, resetTheme} from 'common/js/cache';

export function addTag({commit, state}, tag) {
  let tags = state.tags.slice();
  tags.push(tag);
  commit(types.SET_TAGS, tags);
}

export function deleteTag({commit, state}, name) {
  let tags = state.tags.slice();
  let index = tags.findIndex(tag => {
    return tag.name === name;
  });
  tags.splice(index, 1);
  commit(types.SET_TAGS, tags);
}

export function clearTag({commit}) {
  commit(types.SET_TAGS, []);
}

export function setSystemTheme({commit}, theme) {
  commit(types.SET_THEME, setTheme(theme));
}

export function resetSystemTheme({commit}) {
  commit(types.SET_THEME, resetTheme());
}
