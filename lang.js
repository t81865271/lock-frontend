let currentLang = 'en'; // Default language

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  updateText();
}

function updateText() {
  const elements = document.querySelectorAll('[data-en]');
  
  elements.forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });

  // RTL/LTR and font changes
  if (currentLang === 'ar') {
    document.body.style.direction = 'rtl';
    document.body.style.fontFamily = "'Tajawal', sans-serif"; // Arabic font
  } else {
    document.body.style.direction = 'ltr';
    document.body.style.fontFamily = "'Lato', sans-serif"; // English font
  }
}