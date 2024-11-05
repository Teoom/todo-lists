export function updatingStorage(todosList) {
  let itemsStorage = [];

  for( let i = 0; i < todosList.children.length; i++) {
    if(todosList.children[i].classList[0] !== "todo-list__no-found") {
      itemsStorage.push({
        id: i,
        status: todosList.children[i].classList.contains("item-correct"),
        text: todosList.children[i].children[1].value,
        isDisabled: todosList.children[i].children[1].disabled,
      });
    }
  }
  localStorage.setItem("todoItems", JSON.stringify(itemsStorage));
}
