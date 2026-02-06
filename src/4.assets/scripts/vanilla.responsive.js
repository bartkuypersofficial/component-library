export function initSwitcher(mainElem, buttonsElem) {
  const main = document.querySelector(mainElem);
  const buttons = document.querySelectorAll(buttonsElem);

  if (!main || buttons.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const width = btn.dataset.width;

      main.classList.remove('c-main--mobile', 'c-main--tablet', 'c-main--desktop', 'c-main--full');
      main.classList.add(`c-main--${width}`);

      buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
    });
  });
}