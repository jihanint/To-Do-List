let Input = document.getElementById("todo");
let Button = document.getElementsByTagName("button")[0];
let inputtedList = document.getElementById("todo-list");
let checklistedList = document.getElementById("completed-tasks");

let createNewTaskElement = function (taskString) {
	let listToDo = document.createElement("li");
	let editInput = document.createElement("input"); 
	let editButton = document.createElement("button"); 
	let deleteButton = document.createElement("button");
	let checkList = document.createElement("input"); 
	let labels = document.createElement("label"); 
	labels.innerText = taskString;
	checkList.type = "checkbox";
	editInput.type = "text";
	editButton.innerText = "Edit";	
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	listToDo.appendChild(checkList);
	listToDo.appendChild(labels);
	listToDo.appendChild(editInput);
	listToDo.appendChild(editButton);
	listToDo.appendChild(deleteButton);
	return listToDo;
}

let addTask = function () {
	let listItem = createNewTaskElement(Input.value);
	if (Input.value == "") {
		return;
	}

	inputtedList.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	Input.value = "";
}

let editTask = function () {
	let listItem = this.parentNode;
	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("editMode");
	
	if (containsClass) {
		label.innerText = editInput.value;
	} 
	
	else {
		editInput.value = label.innerText;
	}

	listItem.classList.toggle("editMode");
}

let deleteTask = function () {
	let listItem = this.parentNode;
	let ul = listItem.parentNode;
	ul.removeChild(listItem);
}

let taskCompleted = function () {
	let listItem = this.parentNode;
	checklistedList.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function () {
	let listItem = this.parentNode;
	inputtedList.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

Button.onclick = addTask;
Button.addEventListener("click", addTask);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	console.log("bind list item events");
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let editButton = taskListItem.querySelector("button.edit");
	let deleteButton = taskListItem.querySelector("button.delete");
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < inputtedList.children.length; i++) {
	bindTaskEvents(inputtedList.children[i], taskCompleted);
}

for (let i = 0; i < checklistedList.children.length; i++) {
	bindTaskEvents(checklistedList.children[i], taskIncomplete);
}
