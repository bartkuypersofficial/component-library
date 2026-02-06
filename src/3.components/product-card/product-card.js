/**
 * Initializes interactive behavior for product card components within a given root element.
 *
 * This function:
 * 1. Finds all `.js-product-card` elements inside the provided root.
 * 2. Adds a click event listener to the "Add to Cart" button of each card.
 * 3. Provides visual feedback when a product is added.
 * 4. Simulates a cart action by logging the product title and price to the console.
 * 5. Resets the button state after a short delay (library behavior).
 *
 * @param {HTMLElement} root - The root element containing one or more product cards.
 *
 * @example
 * // Initialize all product cards in a section
 * const section = document.querySelector('.js-product-section');
 * initComponent(section);
 */

export function initComponent(root) {
  if (!root) return;

  const cards = root.querySelectorAll('.js-product-card');

  cards.forEach(card => {
    const button = card.querySelector('.js-add-to-cart');

    button.addEventListener('click', () => {
      // Visual feedback
      button.classList.add('c-product-card__button--added');
      button.textContent = 'Added ✓';

      // Simulated cart action
      console.log('Added to cart:', {
        title: card.querySelector('.c-product-card__title')?.textContent,
        price: card.querySelector('.c-product-card__price')?.textContent
      });

      // Reset after delay (library behavior)
      setTimeout(() => {
        button.classList.remove('c-product-card__button--added');
        button.textContent = 'Add to cart';
      }, 1500);
    });
  });
}
