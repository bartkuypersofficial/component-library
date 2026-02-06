/**
 * Initializes an accordion component within a given root element.
 *
 * This function:
 * 1. Finds all `.js-accordion` items inside the provided root.
 * 2. Sets up accessible IDs and ARIA attributes for buttons and panels.
 * 3. Attaches click and keyboard event listeners to toggle each accordion item.
 *
 * Accessibility considerations:
 * - Each question button gets `aria-expanded` and `aria-controls`.
 * - Each answer panel gets `aria-labelledby` and `aria-hidden`.
 * - Supports toggling via Enter and Space keys for keyboard users.
 *
 * @param {HTMLElement} root - The root element containing the accordion(s).
 *   Only elements inside this root will be affected.
 *
 * @example
 * // Initialize accordion behavior for a section
 * const section = document.querySelector('.js-accordion-section');
 * initComponent(section);
 */

export function initComponent(root) {
  if (!root) return;

  const faqItems = root.querySelectorAll('.js-accordion');

  faqItems.forEach((item, index) => {
    const button = item.querySelector('.c-accordion__question');
    const answer = item.querySelector('.c-accordion__answer');

    if (!button || !answer) return;

    const buttonId = `acc${index + 1}-button`;
    const panelId = `acc${index + 1}-panel`;

    button.id = buttonId;
    button.setAttribute('aria-controls', panelId);
    button.setAttribute('aria-expanded', 'false');

    answer.id = panelId;
    answer.setAttribute('aria-labelledby', buttonId);
    answer.setAttribute('aria-hidden', 'true');

    button.addEventListener('click', (e) => {
      e.preventDefault(); // stop default scroll behavior

      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', String(!isExpanded));
      answer.setAttribute('aria-hidden', String(isExpanded));
      item.classList.toggle('c-accordion__item--active', !isExpanded);
    });

    // Optional: explicit keyboard handling (button already supports this natively)
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
}
