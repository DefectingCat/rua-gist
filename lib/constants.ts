export const MAX_AGE = 86400 * 7;
export const CHECK_THEME = `if (
  localStorage['rua-theme'] === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}`;
