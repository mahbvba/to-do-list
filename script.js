// Get necessary elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const saveBtn = document.getElementById('saveBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearListBtn = document.getElementById('clearListBtn');
const taskList = document.getElementById('taskList');

// Add task event listener
addTaskBtn.addEventListener('click', addTask);

// Load saved tasks on page load
window.addEventListener('DOMContentLoaded', loadTasks);

// Add save event listener
saveBtn.addEventListener('click', saveTasks);

// Add download event listener
downloadBtn.addEventListener('click', downloadList);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value;
  if (taskText.trim() === '') {
    return; // Do not add empty tasks
  }

  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const checkbox = document.createElement('span');
  checkbox.classList.add('checkbox');
  checkbox.addEventListener('click', completeTask);
  taskItem.appendChild(checkbox);

  const taskTextSpan = document.createElement('span');
  taskTextSpan.innerText = taskText;
  taskTextSpan.classList.add('task-text');
  taskItem.appendChild(taskTextSpan);

/*   const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', editTask);
  taskItem.appendChild(editButton); */

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', deleteTask);
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
  taskInput.value = '';
  saveTasks();
}

// Function to edit a task
/* function editTask(event) {
  const taskItem = event.target.parentElement;
  const taskTextSpan = taskItem.querySelector('.task-text');

  const newTaskText = prompt('Enter new task text:', taskTextSpan.innerText);
  if (newTaskText === null || newTaskText.trim() === '') {
    return; // Do not update task if input is empty or canceled
  }

  taskTextSpan.innerText = newTaskText;
  saveTasks();
} */

// Function to mark a task as completed
function completeTask(event) {
  const checkbox = event.target;
  const taskItem = checkbox.parentElement;
  taskItem.classList.toggle('completed');
  checkbox.classList.toggle('checked');
  saveTasks();
}

// Function to delete a task
function deleteTask(event) {
  const taskItem = event.target.parentElement;
  taskList.removeChild(taskItem);
  saveTasks();
}

// Function to save the tasks
function saveTasks() {
  const tasks = [];
  const taskItems = taskList.querySelectorAll('.task-item');

  taskItems.forEach((taskItem) => {
    const taskText = taskItem.querySelector('.task-text').innerText;
    const isCompleted = taskItem.classList.contains('completed');

    tasks.push({ text: taskText, completed: isCompleted });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load saved tasks
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));

  if (savedTasks) {
    savedTasks.forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item');

      const checkbox = document.createElement('span');
      checkbox.classList.add('checkbox');
      checkbox.addEventListener('click', completeTask);
      taskItem.appendChild(checkbox);

      const taskTextSpan = document.createElement('span');
      taskTextSpan.innerText = task.text;
      taskTextSpan.classList.add('task-text');
      taskItem.appendChild(taskTextSpan);

      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.addEventListener('click', editTask);
      taskItem.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', deleteTask);
      taskItem.appendChild(deleteButton);

      if (task.completed) {
        taskItem.classList.add('completed');
        checkbox.classList.add('checked');
      }

      taskList.appendChild(taskItem);
    });
  }
}

// Add clear event listener
clearListBtn.addEventListener('click', clearList);

// Function to clear the list
function clearList() {
  taskList.innerHTML = '';
  saveTasks();
}

// Function to download the to-do list
function downloadList() {
  const tasks = [];
  const taskItems = taskList.querySelectorAll('.task-item');

  taskItems.forEach((taskItem) => {
    const taskText = taskItem.querySelector('.task-text').innerText;
    const isCompleted = taskItem.classList.contains('completed');

    tasks.push({ text: taskText, completed: isCompleted });
  });

  const data = JSON.stringify(tasks);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'to-do-list.json';
  link.click();
}




