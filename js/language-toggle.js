const LANG_STORAGE_KEY = "pa05-lang";

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const titleKey = document.body.dataset.i18nTitle;
  if (titleKey && dict[titleKey]) {
    document.title = dict[titleKey];
  }

  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem(LANG_STORAGE_KEY, lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
  applyLanguage(savedLang === "en" || savedLang === "vi" ? savedLang : "vi");

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
});
