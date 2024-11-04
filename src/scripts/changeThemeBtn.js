const themeBtn = document.querySelector(".theme-change");

export function changeThemeBtn() {
  themeBtn.addEventListener("click", () => {
    const body = document.body;

    if (body.classList.contains("theme-light")) {
      body.classList.remove("theme-light");
      localStorage.setItem("theme", "");
    } else {
      body.classList.add("theme-light");
      localStorage.setItem("theme", "theme-light");
    }
  });
}
