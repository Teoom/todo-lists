export function modal(
  todosItems,
  todosList,
  renderNote,
  getTodos,
  updateLocal,
  deleteNoFound
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
      todosList.children.length === 1 && todosList.children[0].className === `todo-list__no-found` ?
      localStorage.setItem('ids', '0') : "";
      todosList.children[0].className === `todo-list__no-found` ? deleteNoFound(todosList) : ""
     

      if (localStorage.getItem('ids')) {
        const id = localStorage.getItem('ids')
        modal.style.display = "none";
        const item = renderNote(id, false, newTodo.value, true);
        todosList.append(item);
        todosItems.length
          ? (todosItems = [...todosItems, ...getTodos()])
          : (todosItems = getTodos());
        newTodo.value = "";
        localStorage.setItem('ids', `${+localStorage.getItem('ids') + 1}`)
        updateLocal(todosList)
      } else {
        modal.style.display = "none";
        const item = renderNote(0, newTodo.value, true);
        todosList.append(item);
        todosItems.length
          ? (todosItems = [...todosItems, ...getTodos()])
          : (todosItems = getTodos());
        newTodo.value = "";
        localStorage.setItem('ids', "1")
        updateLocal(todosList)
      }

    }
  });
}
