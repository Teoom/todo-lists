import { init } from "./initTodoItems.js";
import { renderNote } from "./renderNote.js";
import { modal } from "./modal.js";
import { search } from "./search.js";
import { initTheme } from "./initTheme.js";
import { btnToggleMenu } from "./toggleMenu.js";
import { changeThemeBtn } from "./changeThemeBtn.js";
import { updatingStorage } from "./updateStorage.js";

initTheme();
changeThemeBtn();

const todosList = document.querySelector(".todos-list");
init(todosList, renderNote);
let todosItems = getTodosItems();

todosList.addEventListener("click", (e) => {
  if (e.target.className === "todo-list__square") {
    e.target.parentElement.classList.toggle("item-correct");

    todosItems = getTodosItems();
    updatingStorage(todosList);
  }

  if (
    e.target.tagName === "SPAN" &&
    e.target.className === "todo-list__tools-delete"
  ) {
    todosList.removeChild(e.target.parentElement.parentElement);

    todosItems = [...todosItems].filter((item) => {
      return (
        item.children[1].value !==
        e.target.parentElement.previousElementSibling.value
      );
    });

    updatingStorage(todosList);
  }

  if (
    e.target.tagName === "svg" &&
    e.target.parentElement.className === "todo-list__tools-edit"
  ) {
    const input =
      e.target.parentElement.parentElement.parentElement.children[1];

    if (input.disabled) {
      input.disabled = false;

      input.focus();
      input.addEventListener("input", () => {
        updatingStorage(todosList);
      });
    } else {
      input.disabled = true;
    }
  }
});

todosList.addEventListener("mouseover", (e) => {
  if (
    e.target.tagName === "svg" &&
    e.target.parentElement.className === "todo-list__tools-edit"
  ) {
    e.target.children[0].style.transition = ".3s";
    e.target.children[0].style.stroke = "#6c63ff";
  }

  if (
    e.target.tagName === "SPAN" &&
    e.target.parentElement.className === "todo-list__tools"
  ) {
    e.target.style.backgroundImage = "url(../../images/trash-hover.svg)";
  }
});

todosList.addEventListener("mouseout", (e) => {
  if (e.target.tagName === "svg") {
    e.target.children[0].style.stroke = "#CDCDCD";
  }

  if (
    e.target.tagName === "SPAN" &&
    e.target.parentElement.className === "todo-list__tools"
  ) {
    e.target.style.backgroundImage = "url(../../images/trash.svg)";
  }
});

modal(todosItems, todosList, renderNote, getTodosItems, updatingStorage);
search(todosItems, todosList);
btnToggleMenu(todosList, renderNote);

function getTodosItems() {
  return document.querySelectorAll(".todos-list__item");
}
