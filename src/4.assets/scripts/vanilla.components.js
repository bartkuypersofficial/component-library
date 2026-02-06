/**
 * Loads a component's HTML from a given path.
 *
 * @async
 * @function
 * @param {Object} component - The component to load.
 * @param {string} component.name - The name of the component.
 * @param {string} component.path - The path to the component's HTML file.
 * @returns {Promise<{name: string, html: string}>} The component with its HTML content.
 */

export const initComponents = async ({ name, path }) => {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`${path} not found`);
    const html = await response.text();
    return { name, html };
  } catch (err) {
    console.error(err);
    return { name, html: `<p>Failed to load component</p>` };
  }
};