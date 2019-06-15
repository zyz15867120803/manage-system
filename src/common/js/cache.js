import storage from 'good-storage';

const THEME_KEY = '__theme__';

export function loadTheme() {
  return storage.get(THEME_KEY, 'light');
}

export function setTheme(theme) {
  storage.set(THEME_KEY, theme);
  return theme;
}

export function resetTheme() {
  storage.remove(THEME_KEY);
  return 'light';
}
