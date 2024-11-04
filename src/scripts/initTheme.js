export function initTheme() {
  if (localStorage.getItem("theme") === "theme-light") {
    document.body.classList.add("theme-light");
  }
}
