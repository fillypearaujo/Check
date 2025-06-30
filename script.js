const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const themeSwitch = document.getElementById('theme-switch');
const mainTitle = document.getElementById('main-title');

window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToDOM);
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeSwitch.checked = true;
    mainTitle.classList.add('dark-title');
  }
};
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.textContent = task.text;
  if (task.done) li.classList.add('done');
  li.addEventListener('click', () => {
    li.classList.toggle('done');
    updateStorage();
  });
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    updateStorage();
  });
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}
function updateStorage() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.childNodes[0].nodeValue.trim(),
      done: li.classList.contains('done')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text === '') return;
  addTaskToDOM({ text, done: false });
  updateStorage();
  input.value = '';
});
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  mainTitle.classList.toggle('dark-title', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
