import { components } from './components.js';
import { initComponents } from './4.assets/scripts/vanilla.components.js';
import { initSwitcher } from './4.assets/scripts/vanilla.responsive.js';
import { initDarkMode } from './4.assets/scripts/vanilla.darkmode.js';

const main = document.querySelector('.js-main');
const template = document.querySelector('.js-template');

/**
 * Loads and renders all components into the main section of the page.
 * Uses the template for consistency and then initializes the switcher.
 *
 * @async
 * @function
 */

(async () => {
  for (const component of components) {
    /**
     * @type {{name: string, html: string}}
     * @description The loaded component with its name and HTML content.
     */
    const { name, html } = await initComponents(component);

    // Clone the template and fill it with component data
    const clone = template.content.cloneNode(true);
    clone.querySelector('.c-section__title').textContent = name;
    clone.querySelector('.c-section__content').innerHTML = html;

    main.append(clone);
  }

  /**
   * Initialize the switcher functionality for the header buttons
   */
  initSwitcher('.js-main', '.js-viewport');

  /**
   * Initialize dark mode toggle on page load
   */
  initDarkMode('.js-darkmode');
})();