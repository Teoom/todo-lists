export function modal(
  todosItems,
  todosList,
  renderNote,
  getTodos,
  updateLocal
) {
  const modal = document.querySelector(".modal-note");
  const btnCancel = document.querySelector(".note__buttons__cancel");
  const btnApply = document.querySelector(".note__buttons__apply");
  const btnAppend = document.querySelector(".append-todo");
  const newTodo = document.querySelector(".note-input");

  btnAppend.addEventListener("click", () => {
    modal.style.display = "block";
  });

  btnCancel.addEventListener("click", () => {
    modal.style.display = "none";
    newTodo.value = "";
  });

  btnApply.addEventListener("click", () => {
    if (newTodo.value.length <= 3) {
      alert("You must enter a note from 3 to 50 characters!");
      newTodo.value = "";
    } else {
      modal.style.display = "none";
      const item = renderNote(false, newTodo.value, true);
      todosList.append(item);
      todosItems.length
        ? (todosItems = [...todosItems, ...getTodos()])
        : (todosItems = getTodos());
      newTodo.value = "";
      updateLocal(todosList);
    }
  });
}
