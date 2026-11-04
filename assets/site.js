(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const button = header?.querySelector('.menu-btn');
  const navigation = header?.querySelector('.nav-links');
  if (!button || !navigation) return;

  const close = () => {
    navigation.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      close();
      button.focus();
    }
  });
  window.matchMedia('(max-width: 900px)').addEventListener('change', close);
  header.classList.add('nav-ready');
  button.hidden = false;
})();
