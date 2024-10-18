const addBtn = document.getElementById("add-btn");
const inputField = document.getElementById("input-field");
const elements = document.getElementById("elements");

window.onload = function() {
    loadTodosFromLocalStorage();
}

addBtn.onclick = function() {
    let inputFieldValue = inputField.value;
    if (inputFieldValue.trim() !== "") {
        addTodo(inputFieldValue);
        saveToLocalStorage(inputFieldValue); 
        inputField.value = ""; 
    }
}


function addTodo(text) {
    // Neues div für das To-do
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("single-todo");

    // Neue Checkbox erstellen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "done";

    // Neues Label erstellen
    const label = document.createElement("label");
    label.textContent = text;

    // DESTROY-Button erstellen
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.onclick = function() {
        elements.removeChild(todoDiv);
        removeTodoFromLocalStorage(text);
    }

    // Elemente zum div hinzufügen
    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(label);
    todoDiv.appendChild(button);

    // To-do in den `elements`-Container einfügen
    elements.appendChild(todoDiv);
}


function saveToLocalStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push( { text: todoText, done: false} );
    localStorage.setItem("todos", JSON.stringify(todos));
}


function removeTodoFromLocalStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo.text !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromLocalStorage() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        addTodo(todo.text, todo.done);
    });
}