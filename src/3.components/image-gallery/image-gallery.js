/**
 * Initializes an interactive image gallery with a modal dialog viewer.
 *
 * This function:
 * 1. Finds all gallery buttons (`.js-image-gallery-button`) inside the given root.
 * 2. Prepares a modal dialog with next/previous navigation and a close button.
 * 3. Handles click events to open images in the dialog.
 * 4. Adds optional "+N" overlay if there are more images than visible thumbnails.
 * 5. Supports keyboard navigation: Escape to close, ArrowLeft/ArrowRight to navigate.
 * 6. Locks scrolling when the dialog is open and restores it on close.
 *
 * Accessibility considerations:
 * - Uses `aria-hidden` to hide/show the dialog.
 * - Focus is moved to the close button when the dialog opens.
 * - The overlay element is marked as `aria-hidden`.
 *
 * @param {HTMLElement} root - The root element containing the image gallery and dialog elements.
 *
 * @example
 * // Initialize the gallery for a specific section
 * const gallerySection = document.querySelector('.js-image-gallery-section');
 * initComponent(gallerySection);
 */

export function initComponent(root) {
  const galleryItems = root.querySelectorAll('.js-image-gallery-button');

  // Dialog elements
  const dialog = root.querySelector('.js-dialog');
  const dialogImg = root.querySelector('.js-dialog-img');
  const dialogClose = root.querySelector('.js-dialog-close');
  const dialogPrev = root.querySelector('.js-dialog-prev');
  const dialogNext = root.querySelector('.js-dialog-next');

  const images = [
    { src: './src/4.assets/images/meerhoven.webp', alt: 'Meerhoven gallery image 1' },
    { src: './src/4.assets/images/meerhoven-2.webp', alt: 'Meerhoven gallery image 2' },
    { src: './src/4.assets/images/meerhoven-3.webp', alt: 'Meerhoven gallery image 3' },
    { src: './src/4.assets/images/meerhoven-4.webp', alt: 'Meerhoven gallery image 4' },
    { src: './src/4.assets/images/meerhoven-5.webp', alt: 'Meerhoven gallery image 5' },
    { src: './src/4.assets/images/meerhoven-6.webp', alt: 'Meerhoven gallery image 6' }
  ];

  // add +N overlay on the last visible image
  const visibleCount = parseInt(root.dataset.visible, 10) || 4;
  const extraCount = images.length - visibleCount;
  if (extraCount > 0 && galleryItems[visibleCount - 1]) {
    const overlay = document.createElement('div');
    overlay.className = 'c-image-gallery__overlay';
    overlay.textContent = `+${extraCount}`;
    overlay.setAttribute('aria-hidden', 'true');
    galleryItems[visibleCount - 1].appendChild(overlay);
  }

  let currentIndex = 0;
  let scrollPosition = 0;

  function openDialog(index) {
    currentIndex = index;
    dialogImg.src = images[currentIndex].src;
    dialogImg.alt = images[currentIndex].alt;

    // Lock scroll
    scrollPosition = window.scrollY;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    dialog.setAttribute('aria-hidden', 'false');
    dialogClose.focus();
  }

  function closeDialog() {
    dialog.setAttribute('aria-hidden', 'true');
    dialogImg.src = '';

    // Restore scroll
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    dialogImg.src = images[currentIndex].src;
    dialogImg.alt = images[currentIndex].alt;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    dialogImg.src = images[currentIndex].src;
    dialogImg.alt = images[currentIndex].alt;
  }

  galleryItems.forEach((item, index) => {
    item.dataset.index = index;
    item.addEventListener('click', () => openDialog(index));
  });

  // Dialog button events
  dialogClose.addEventListener('click', closeDialog);
  dialogPrev.addEventListener('click', showPrev);
  dialogNext.addEventListener('click', showNext);

  // Close dialog when clicking outside image
  dialog.addEventListener('click', e => {
    if (e.target === dialog) closeDialog();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (dialog.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeDialog();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
}
