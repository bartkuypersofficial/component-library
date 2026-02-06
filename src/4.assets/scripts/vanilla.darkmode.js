/**
 * Toggles dark mode by adding/removing 'is-dark' class on <body>.
 * Updates the button's aria-pressed state for accessibility.
 *
 * @param {string} buttonSelector - CSS selector for the dark mode toggle button
 */

export function initDarkMode(buttonSelector) {
  const btn = document.querySelector(buttonSelector);
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('is-dark');
    btn.setAttribute('aria-pressed', isDark);
  });
}