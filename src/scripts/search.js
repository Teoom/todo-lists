export function search(todosItems, todosList) {
  const search = document.querySelector(".search");
  const searchBtn = document.querySelector(".search-loop");

  search.addEventListener("input", () => {
    if (!search.value) {
      for (let i = 0; i < todosItems.length; i++) {
        todosList.append(todosItems[i]);
      }
    }
  });

  searchBtn.addEventListener("click", (e) => {
    if (search.value) {
      const searchTodosItems = [...todosItems].filter((item) => {
        return !item.children[1].value
          .toLowerCase()
          .includes(search.value.toLowerCase());
      });
      if (searchTodosItems.length) {
        for (let item of searchTodosItems) {
          item.remove();
        }
      }
    }
  });
}
