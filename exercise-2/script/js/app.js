let taskInput = document.getElementById("new-task");
let addButton = document.getElementById("addBtn");
let incompleteTasksHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const newTaskTemplate = `
  <li>
    <input type="checkbox" class="add-task-checkbox"/>
    <label class="add-task-label">${taskString}</label>
    <input type="text" class="add-task-input"/>
    <button type="button" class="edit">Edit</button>
    <button type="button" class="delete">Delete</button>
  </li>
  `;

  let parser = new DOMParser();
  let dom = parser.parseFromString(newTaskTemplate, "text/html");
  let listItem = dom.body.firstChild;

  return listItem;
};

const addTask = function () {
  let listItemName = taskInput.value || "";
  if(listItemName.trim().length===0 || listItemName===null) {
    window.alert("Input is empty!")
  }else {
    listItem = createNewTaskElement(listItemName);
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  }
};

const editTask = function () {
  let listItem = this.parentNode;
  let editInput = listItem.getElementsByClassName("add-task-input")[0];
  let label = listItem.getElementsByClassName("add-task-label")[0];
  let button = listItem.getElementsByClassName("edit")[0];

  let containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
    button.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    button.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.getElementsByClassName("add-task-checkbox")[0];
  let editButton = taskListItem.getElementsByClassName("edit")[0];
  let deleteButton = taskListItem.getElementsByClassName("delete")[0];
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
