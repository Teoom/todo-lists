export function init(todosList, cb) {
  const localItems = JSON.parse(localStorage.getItem("todoItems")) || [];

  if (localItems.length) {
    for (let i = 0; i < localItems.length; i++) {
      todosList.append(
        cb(localItems[i].status, localItems[i].text, localItems[i].isDisabled)
      );
    }
  }
}
