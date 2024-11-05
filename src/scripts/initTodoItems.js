export function init(todosList, renderNote, renderNoFound) {
  const localItems = JSON.parse(localStorage.getItem("todoItems")) || [];

  if (localItems.length) {
    for (let i = 0; i < localItems.length; i++) {
      todosList.append(
        renderNote(localItems[i].id, localItems[i].status, localItems[i].text, localItems[i].isDisabled)
      );
    }
  } else {
    renderNoFound(todosList)
  }

  

}
