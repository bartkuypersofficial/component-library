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