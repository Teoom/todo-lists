export function updatingStorage(todosList) {
  let itemsStorage = [];

  for (let list of todosList.children) {
    itemsStorage.push({
      status: list.classList.contains("item-correct"),
      text: list.children[1].value,
      isDisabled: list.children[1].disabled,
    });
  }

  localStorage.setItem("todoItems", JSON.stringify(itemsStorage));
}
