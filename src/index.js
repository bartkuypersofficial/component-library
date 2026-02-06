import { components } from './components.js';
import { initComponents } from './4.assets/scripts/vanilla.components.js';
import { initSwitcher } from './4.assets/scripts/vanilla.responsive.js';

const main = document.querySelector('.js-main');
const template = document.querySelector('.js-template');

(async () => {
  for (const component of components) {
    const { name, html } = await initComponents(component);

    const clone = template.content.cloneNode(true);
    clone.querySelector('.c-section__title').textContent = name;
    clone.querySelector('.c-section__content').innerHTML = html;

    main.append(clone);
  }

  initSwitcher('.js-main', '.c-header__button');
})();