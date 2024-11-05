export function search(todosList, renderNote, renderNoFound, func) {

  const search = document.querySelector(".search");
  const searchBtn = document.querySelector(".search-loop");

  search.addEventListener('input', (e) => {
    const localItems = JSON.parse(localStorage.getItem('todoItems'))

    if (!search.value) {
      searchBtn.classList.remove("active")


      if (localItems.length > 1) {
        func[0](todosList)
        func[1](todosList, renderNote, localItems)
      }

      if (localItems.length === 1) {
        func[0](todosList)
        func[1](todosList, renderNote, localItems)
      }

      if (localItems.length === 0) {
        func[0](todosList)
        renderNoFound(todosList)
      }
    }
  });


  search.addEventListener('keydown', (e) => {
    const localItems = JSON.parse(localStorage.getItem('todoItems'))


    if (e.code === 'Enter') {
      if (search.value) {

        searchBtn.classList.add("active")
        const searchTodosItems = [...localItems].filter((item) => {
          return item.text
            .toLowerCase()
            .includes(search.value.toLowerCase());
        });


        if (searchTodosItems.length) {
          func[0](todosList)
          func[1](todosList, renderNote, searchTodosItems)
        } else {
          func[0](todosList)
          renderNoFound(todosList)
        }

      } else {
        alert('Enter something to search')
      }
    }



  })

  searchBtn.addEventListener("click", (e) => {
    const localItems = JSON.parse(localStorage.getItem('todoItems'))

    if (search.value) {
      searchBtn.classList.add("active")
      const searchTodosItems = [...localItems].filter((item) => {
        return item.text
          .toLowerCase()
          .includes(search.value.toLowerCase());
      });


      if (searchTodosItems.length) {
        func[0](todosList)
        func[1](todosList, renderNote, searchTodosItems)
      } else {
        func[0](todosList)
        renderNoFound(todosList)
      }


    } else {
      alert('Enter something to search')
    }
  });
}


