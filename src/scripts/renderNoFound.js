export function renderNoFound(todoList) {
  const li = document.createElement('li')
  li.classList.add('todo-list__no-found')

  const img = document.createElement('img')
  img.classList.add('todo-list__img')
  img.alt = 'The detective found nothing' 
  img.src = '../images/no-found.png'

  li.append(img)

  todoList.append(li)
}


export function deleteNoFound(todoList) {
  todoList.children[0].remove();
}