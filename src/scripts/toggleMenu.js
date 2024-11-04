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

function addActive(menu, todosList, renderNote, state) {
  const all = document.querySelector(".select-all");
  const complete = document.querySelector(".select-complete");
  const incomplete = document.querySelector(".select-incomplete");

  const localItems = JSON.parse(localStorage.getItem("todoItems"));

  if (menu) {
    if (state === "select-complete") {
      isSelectActive(all, incomplete, complete);
      let completeItems = localItems.filter((item) => {
        return item.status ? true : false;
      });

      if (completeItems.length) {
        for (let i = 0; i < todosList.children.length; i++) {
          todosList.children[i].remove();

          --i;
        }

        for (let item of completeItems) {
          todosList.append(renderNote(item.status, item.text, item.isDisabled));
        }
      }

      if (!completeItems.length) {
        for (let i = 0; i < todosList.children.length; i++) {
          todosList.children[i].remove();

          i--;
        }
      }
    } else {
      isSelectActive(all, complete, incomplete);
      let incompleteItems = localItems.filter((item) => {
        return item.status ? false : true;
      });

      if (incompleteItems.length) {
        for (let i = 0; i < todosList.children.length; i++) {
          todosList.children[i].remove();

          --i;
        }

        for (let item of incompleteItems) {
          todosList.append(renderNote(item.status, item.text, item.isDisabled));
        }
      }

      if (!incompleteItems.length) {
        for (let i = 0; i < todosList.children.length; i++) {
          todosList.children[i].remove();

          --i;
        }
      }
    }

    return;
  }

  isSelectActive(complete, incomplete, all);

  for (let i = 0; i < todosList.children.length; i++) {
    todosList.children[i].remove();

    --i;
  }

  for (let item of localItems) {
    todosList.append(renderNote(item.status, item.text, item.isDisabled));
  }
}

export function btnToggleMenu(todosList, renderNote) {
  btnArrow.addEventListener("click", () => {
    toggleMenu();
  });

  for (let elem of selectList) {
    elem.addEventListener("click", (e) => {
      if (elem.children[0].className === "select-all") {
        toggleMenu();
        addActive(false, todosList, renderNote);
      }

      if (
        elem.children[0].className === "select-complete" ||
        elem.children[0].className === "select-incomplete"
      ) {
        addActive(true, todosList, renderNote, elem.children[0].classList[0]);
      }
    });
  }
}
