
export function deleteItems(todosList) {
  for (let i = 0; i < todosList.children.length; i++) {
    todosList.children[i].remove();

    --i;
  }
}

export function appendItems(todosList, renderNote, items) {
  for (let item of items) {
    todosList.append(renderNote(item.id, item.status, item.text, item.isDisabled));
  }
}