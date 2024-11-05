import { init } from "./initTodoItems.js";
import { renderNote } from "./renderNote.js";
import { modal } from "./modal.js";
import { search } from "./search.js";
import { initTheme } from "./initTheme.js";
import { btnToggleMenu } from "./toggleMenu.js";
import { changeThemeBtn } from "./changeThemeBtn.js";
import { updatingStorage } from "./updateStorage.js";
import { renderNoFound, deleteNoFound } from "./renderNoFound.js";
import { deleteItems, appendItems } from "./appendDeleteItems.js";

initTheme();
changeThemeBtn();

let todosList = document.querySelector(".todos-list");
init(todosList, renderNote, renderNoFound);
let todosItems = getTodosItems();

todosList.addEventListener("click", (e) => {
  const searchBtn = document.querySelector(".search-loop");
  const complete = document.querySelector(".select-complete");
  const incomplete = document.querySelector(".select-incomplete");
  let localItems = JSON.parse(localStorage.getItem('todoItems'))


  if (e.target.className === "todo-list__square") {

    e.target.parentElement.classList.toggle("item-correct");


    if (complete.parentElement.classList.contains('active') || incomplete.parentElement.classList.contains('active') || searchBtn.classList.contains('active')) {

      localItems = localItems.map(item => {
        if (item.id === +e.target.parentElement.getAttribute('data-id')) {
          return { ...item, status: !item.status }
        }
        return item
      })
      localStorage.setItem("todoItems", JSON.stringify(localItems));
    } else {
      updatingStorage(todosList)
    }

  }

  if (
    e.target.tagName === "SPAN" &&
    e.target.className === "todo-list__tools-delete"
  ) {

    todosList.removeChild(e.target.parentElement.parentElement);

    localItems = localItems.filter(item => {
      return item.id != e.target.parentElement.parentElement.getAttribute("data-id")
    })

    localItems = localItems.map(item => {
      return { ...item, id: item.id === 0 ? 0 : item.id - 1};
    })

    localStorage.setItem("todoItems", JSON.stringify(localItems));
    localStorage.setItem('ids', `${localItems.length ? localItems.length : 0}`)


    if (complete.parentElement.classList.contains('active') || incomplete.parentElement.classList.contains('active') || searchBtn.classList.contains('active')) {
      
    } else {
      deleteItems(todosList)
      appendItems(todosList, renderNote, localItems)
    }



    if (!todosList.children.length) {
      renderNoFound(todosList)
  
      if (!localStorage.length) {
        localStorage.setItem("todoItems", false);
      }
    }


  }

  if (
    e.target.tagName === "svg" &&
    e.target.parentElement.className === "todo-list__tools-edit"
  ) {
    const input =
      e.target.parentElement.parentElement.parentElement.children[1];

    if (input.disabled) {
      input.disabled = false;
      const parentDataId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id')
      input.focus();
      input.addEventListener("input", () => {
        
        localItems = localItems.map(item => {
          if(item.id == parentDataId) {
            return {...item, text: input.value}
          }
          return item;
        })
        localStorage.setItem("todoItems", JSON.stringify(localItems));
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

modal(todosItems, todosList, renderNote, getTodosItems, updatingStorage, deleteNoFound);
search(todosList, renderNote, renderNoFound, [deleteItems, appendItems]);
btnToggleMenu(todosList, renderNote, renderNoFound, [deleteItems, appendItems]);

function getTodosItems() {
  return document.querySelectorAll(".todos-list__item");
}
