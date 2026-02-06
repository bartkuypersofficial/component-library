/**
 * Initializes a switcher that changes the main element's width class
 * when buttons are clicked and updates ARIA attributes for accessibility.
 *
 * @param {string} mainElem - A CSS selector for the main element whose classes will change.
 * @param {string} buttonsElem - A CSS selector for the buttons that trigger width changes.
 */

export function initSwitcher(mainElem, buttonsElem) {
  const main = document.querySelector(mainElem);
  const buttons = document.querySelectorAll(buttonsElem);

  if (!main || buttons.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const width = btn.dataset.type;

      // Remove all existing type classes and add the new one
      main.classList.remove('c-main--mobile', 'c-main--tablet', 'c-main--desktop', 'c-main--full');
      main.classList.add(`c-main--${width}`);

      // Update ARIA attributes for accessibility
      buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
    });
  });
}