/**
 * Array of UI components to be loaded and rendered on the page.
 *
 * Each component object defines the following properties:
 * - `name` {string}: Human-readable name of the component.
 * - `path` {string}: Relative path to the component's HTML file.
 * - `js` {string} [optional]: Relative path to the component's JavaScript file,
 *   which will be dynamically imported and initialized for that component.
 *
 * This array is used by the main page initializer to:
 * 1. Fetch the HTML for each component.
 * 2. Render it into the template.
 * 3. Optionally initialize its JavaScript behavior.
 *
 * @type {Array<{
 *   name: string,
 *   path: string,
 *   js?: string
 * }>}
 * @example
 * components.forEach(component => {
 *   console.log(component.name, component.path, component.js);
 * });
 */

export const components = [
  {
    name: 'Product Card',
    path: './src/3.components/product-card/product-card.html',
    js: './3.components/product-card/product-card.js'
  },
  {
    name: 'Accordion',
    path: './src/3.components/accordion/accordion.html',
    js: './3.components/accordion/accordion.js'
  },
  {
    name: 'Image Gallery',
    path: './src/3.components/image-gallery/image-gallery.html',
    js: './3.components/image-gallery/image-gallery.js'
  },
  {
    name: 'Contact Form',
    path: './src/3.components/contact-form/contact-form.html',
    js: './3.components/contact-form/contact-form.js'
  }
];
