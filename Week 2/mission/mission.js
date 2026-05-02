const selectElem = document.querySelector('#themeSelect');
const logo = document.querySelector('#byui-logo');

function applyTheme(theme) {
  document.body.classList.remove('dark', 'light');

  if (theme === 'dark') {
    document.body.classList.add('dark');
    if (logo) {
      logo.src = 'byui-logo-white.png';
      logo.alt = 'BYU-Idaho Logo Dark';
    }
  } else {
    if (theme === 'light') {
      document.body.classList.add('light');
    }
    if (logo) {
      logo.src = 'byui-logo-blue.webp';
      logo.alt = 'BYU-Idaho Logo';
    }
  }
}

if (selectElem) {
  applyTheme('');

  selectElem.addEventListener('change', () => {
    applyTheme(selectElem.value);
  });
}