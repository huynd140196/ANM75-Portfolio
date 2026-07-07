const THEME_STORAGE_KEY = "pa05-theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(savedTheme === "light" ? "light" : "dark");

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme;
      applyTheme(current === "light" ? "dark" : "light");
    });
  }
});
