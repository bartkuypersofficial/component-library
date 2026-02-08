import { components } from './components.js';
import { initComponents } from './4.assets/scripts/vanilla.components.js';
import { initSwitcher } from './4.assets/scripts/vanilla.responsive.js';
import { initDarkMode } from './4.assets/scripts/vanilla.darkmode.js';

const main = document.querySelector('.js-main');
const template = document.querySelector('.js-template');

/**
 * Immediately-invoked async function that loads and renders all UI components
 * into the main section of the page.
 *
 * Each component is fetched using `initComponents`, cloned into a template,
 * and appended to the DOM. If a component has associated JavaScript, it is
 * dynamically imported and initialized for its own section only.
 *
 * After all components are rendered:
 * 1. Initializes the switcher functionality for navigating between sections.
 * 2. Initializes the dark mode toggle for the page.
 *
 * @async
 * @function
 * @example
 * // The function executes automatically, so no need to call it manually.
 * // Components are rendered and initialized on page load.
 */

/**
 * Preload all component JS modules that Vite can statically analyze.
 * Keys are file paths, values are async import functions.
 */
const componentModules = import.meta.glob('./3.components/**/*.js');

(async () => {
  for (const component of components) {
    /**
     * Represents a single component with its metadata and HTML content.
     *
     * @typedef {Object} ComponentData
     * @property {string} name - The human-readable name of the component.
     * @property {string} html - The HTML markup for the component.
     *
     * @type {ComponentData}
     */

    const {name, html} = await initComponents(component);

    // Clone the template and populate it with component data
    const clone = template.content.cloneNode(true);
    clone.querySelector('.js-template-title').textContent = name;
    clone.querySelector('.js-template-content').innerHTML = html;
    
    const sectionRoot = clone.querySelector('.js-template-content');

    // Append the fully prepared section to the main container
    main.append(clone);

    // Dynamically load and initialize component-specific JS if provided
    if (component.js) {
      const loader = componentModules[component.js];

      if (!loader) {
        console.warn(`Component script not found: ${component.js}`);
        continue;
      }

      const mod = await loader();

      if (mod.initComponent) {
        /**
         * Initialize JavaScript behavior for this specific component section.
         * Ensures scripts do not interfere with other components.
         *
         * @param {HTMLElement} sectionRoot - Root element of the component's HTML.
         */

        mod.initComponent(sectionRoot);
      }
    }
  }

  /**
   * Initialize the switcher functionality for the header buttons.
   * @param {string} containerSelector - Selector for the main container.
   * @param {string} viewportSelector - Selector for the viewport element.
   */

  initSwitcher('.js-main', '.js-viewport');

  /**
   * Initialize dark mode toggle on page load.
   * @param {string} toggleSelector - Selector for the dark mode toggle button.
   */
  
  initDarkMode('.js-darkmode');
})();
