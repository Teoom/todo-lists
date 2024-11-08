export function renderNote(id, status, value, isDisabled) {
  const li = document.createElement("li");
  li.className = "todos-list__item";
  status ? li.classList.add("item-correct") : "";
  li.setAttribute('data-id', id)

  const span = document.createElement("span");
  span.className = "todo-list__square";
  span.setAttribute("title", "Done!");

  const inpuTodo = document.createElement("input");
  inpuTodo.className = "todo-list__textarea";
  inpuTodo.value = value;
  inpuTodo.disabled = isDisabled;

  const tools = document.createElement("div");
  tools.className = "todo-list__tools";

  const spanEdit = document.createElement("span");
  spanEdit.className = "todo-list__tools-edit";
  spanEdit.setAttribute("title", "Start/Finish edit");

  const spanDelete = document.createElement("span");
  spanDelete.className = "todo-list__tools-delete";
  spanDelete.setAttribute("title", "Delete note");

  const svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEdit.setAttribute("width", "15");
  svgEdit.setAttribute("height", "14");
  svgEdit.setAttribute("viewBox", "0 0 15 14");
  svgEdit.setAttribute("fill", "none");

  const pathEdit = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathEdit.setAttribute(
    "d",
    "M7.67272 3.49106L1 10.1637V13.5H4.33636L11.0091 6.82736M7.67272 3.49106L10.0654 1.09837L10.0669 1.09695C10.3962 0.767585 10.5612 0.602613 10.7514 0.540824C10.9189 0.486392 11.0993 0.486392 11.2669 0.540824C11.4569 0.602571 11.6217 0.767352 11.9506 1.09625L13.4018 2.54738C13.7321 2.87769 13.8973 3.04292 13.9592 3.23337C14.0136 3.40088 14.0136 3.58133 13.9592 3.74885C13.8974 3.93916 13.7324 4.10414 13.4025 4.43398L13.4018 4.43468L11.0091 6.82736M7.67272 3.49106L11.0091 6.82736"
  );
  pathEdit.setAttribute("stroke", "#CDCDCD");
  pathEdit.setAttribute("stroke-linecap", "round");
  pathEdit.setAttribute("stroke-linejoin", "round");

  svgEdit.append(pathEdit);
  spanEdit.append(svgEdit);

  tools.append(spanEdit, spanDelete);

  li.append(span, inpuTodo, tools);

  return li;
}
