const taskInput = document.getElementById("new-task"); 
const addButton = document.getElementsByTagName("button")[0]; 
const incompleteTaskHolder = document.getElementById("incomplete-tasks"); 
const completedTasksHolder = document.getElementById("completed-tasks"); 

const createNewTaskElement = (taskString)  => {
    const listItem = document.createElement("li");
    listItem.className = "task-list__item";

    const checkBox = document.createElement("input"); 
    checkBox.type = "checkbox";
    checkBox.classList = "task-list__checkbox";
    listItem.appendChild(checkBox);

    const label = document.createElement("label"); 
    label.innerText = taskString;
    label.className = "task-list__title task-list__label";
    listItem.appendChild(label);

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "task-list__title task-list__input";
    listItem.appendChild(editInput);

    const editButton = document.createElement("button"); 
    editButton.innerText = "Edit";
    editButton.className = "btn btn-edit";
    listItem.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-delete";
    listItem.appendChild(deleteButton);

    const deleteButtonImg = document.createElement("img"); 
    deleteButtonImg.className = "btn-delete__img";
    deleteButton.className = "btn btn-delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    return listItem;
};

const addTask = () => {
if(!taskInput.value) return;
const itemList = createNewTaskElement(taskInput.value)
incompleteTaskHolder.appendChild(itemList)
bindTaskEvents(itemList, taskCompleted)
taskInput.value = ""
}

const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".btn-edit");
    const containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .edit-mode
    if (containsClass) {
        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    //toggle .edit-mode on the parent.
    listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
};

const taskCompleted = function () {
    //Append the task list item to the #completed-tasks
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
    //Append the task list item to the #incomplete-tasks.
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);


const bindTaskEvents =  (taskListItem, checkBoxEventHandler) => {
    //select ListItems children
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.btn-edit");
    const deleteButton = taskListItem.querySelector("button.btn-delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
