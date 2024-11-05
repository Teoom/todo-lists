const btnArrow = document.querySelector(".checkbox-pseudo");
const selectList = document.querySelectorAll(".select-list__item");

function toggleMenu() {
  const selectList = document.querySelector(".select-list");
  const display = getComputedStyle(selectList).display;
  const array = getComputedStyle(btnArrow).backgroundImage;

  array.includes("down")
    ? (btnArrow.style.backgroundImage = "url(../../images/arrow-up.svg)")
    : (btnArrow.style.backgroundImage = "url(../../images/arrow-down.svg)");
  display === "none"
    ? (selectList.style.display = "block")
    : (selectList.style.display = "none");
}
function isSelectActive(select1, select2, select3) {
  select1.parentElement.classList.remove("active");
  select2.parentElement.classList.remove("active");
  select3.parentElement.classList.add("active");
}



function addActive(menu, todosList, renderNote, renderNoFound, funcs, state) {
  const all = document.querySelector(".select-all");
  const complete = document.querySelector(".select-complete");
  const incomplete = document.querySelector(".select-incomplete");

  const className = localStorage.getItem('class')
  const localItems = JSON.parse(localStorage.getItem("todoItems"));

  if (menu) {
    if (state === "select-complete") {
      isSelectActive(all, incomplete, complete);

      let completeItems = localItems.filter((item) => {
        return item.status ? true : false;
      });

      if (completeItems.length) {
        funcs[0](todosList)
        funcs[1](todosList, renderNote, completeItems)

      }

      if (!completeItems.length) {
        funcs[0](todosList)
        renderNoFound(todosList)
      }
    } else {
      isSelectActive(all, complete, incomplete);
      let incompleteItems = localItems.filter((item) => {
        return item.status ? false : true;
      });

      if (incompleteItems.length) {
        funcs[0](todosList)
        funcs[1](todosList, renderNote, incompleteItems)

      }

      if (!incompleteItems.length) {
        funcs[0](todosList)
        renderNoFound(todosList)
      }
    }

    return;
  }

  isSelectActive(complete, incomplete, all);

  if (localItems.length > 1) {

    funcs[0](todosList)
    funcs[1](todosList, renderNote, localItems)

  } else {

    if (className === 'todo-list__no-found') {
      funcs[0](todosList)
      renderNoFound(todosList)
    } else {
      funcs[0](todosList)
      funcs[1](todosList, renderNote, localItems)
    }
  }


}


export function btnToggleMenu(todosList, renderNote, renderNoFound, funcs) {
  btnArrow.addEventListener("click", () => {
    toggleMenu();
    localStorage.setItem('class', todosList.children[0].classList[0])
  });

  for (let elem of selectList) {
    elem.addEventListener("click", (e) => {
      if (elem.children[0].className === "select-all") {
        toggleMenu();
        addActive(false, todosList, renderNote, renderNoFound, funcs);
      }

      if (
        elem.children[0].className === "select-complete" ||
        elem.children[0].className === "select-incomplete"
      ) {
        addActive(true, todosList, renderNote, renderNoFound, funcs, elem.children[0].classList[0]);
      }
    });
  }
}

