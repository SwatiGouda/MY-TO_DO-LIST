const loginContainer = document.getElementById('login-container');
const todoContainer = document.getElementById('todo-container');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorText = document.getElementById('login-error');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = null;

const FIXED_USERNAME = "admin";
const FIXED_PASSWORD = "12345";

function checkLogin() {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    loginContainer.classList.add('hidden');
    todoContainer.classList.remove('hidden');
    renderTasks();
  }
}

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    errorText.textContent = " Please enter username and password.";
    return;
  }

  if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
    localStorage.setItem('isLoggedIn', 'true');
    errorText.textContent = "";
    checkLogin();
  } else {
    errorText.textContent = " Invalid credentials. Try again.";
  }
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  loginContainer.classList.remove('hidden');
  todoContainer.classList.add('hidden');
}

function addTask() {
  const task = taskInput.value.trim();
  if (!task) return;

  if (editIndex !== null) {
    tasks[editIndex] = task;
    editIndex = null;
  } else {
    tasks.push(task);
  }

  taskInput.value = '';
  saveAndRender();
}

function editTask(index) {
  taskInput.value = tasks[index];
  editIndex = index;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function deleteAll() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    tasks = [];
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <span>${task}</span>
      <div class="actions">
        <button class="btn" onclick="editTask(${index})">Edit</button>
        <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(div);
  });
}

window.onload = checkLogin;
