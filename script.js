// ToDo App
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const totalTasks = document.getElementById("total-tasks");
const searchInput = document.getElementById("search-input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("add-id").addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    taskInput.value = "";
    renderTasks();
  }
});

function addTask(text) {
  const task = {
    text: text,
    completed: false,
    editable: false,
  };
  tasks.push(task);
  saveTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  const filteredTasks = getFilteredTasks();
  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "Checked" : "";

    li.innerHTML = `
            <div class="task-container">
                <input type="text" value="${task.text}" ${
      task.editable ? "" : "readonly"
    } />
                <button class="edit-btn" onclick="toggleEditTask(${index})">${
      task.editable ? "Save" : "Edit"
    }</button>
                <span class="delete-btn" onclick="deleteTask(${index})">×</span>
            </div>
        `;

    li.querySelector("input").addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });

  totalTasks.textContent = filteredTasks.length;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleEditTask(index) {
  if (tasks[index].editable) {
    const taskInputField = taskList.querySelectorAll("input")[index];
    tasks[index].text = taskInputField.value;
  }
  tasks[index].editable = !tasks[index].editable;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

searchInput.addEventListener("input", () => {
  renderTasks();
});

function getFilteredTasks() {
  const query = searchInput.value.toLowerCase();
  return tasks.filter((task) => task.text.toLowerCase().includes(query));
}

renderTasks();
