import { v4 as uuidv4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
  }).format(new Date(date));

const todoList = document.querySelector<HTMLUListElement>('.to-do__list');
const todoForm = document.querySelector(
  '#to-do__form',
) as HTMLFormElement | null;

const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

const todoInput = document.querySelector<HTMLInputElement>('#to-do__input');
todoForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (todoInput?.value == '' || todoInput?.value == null) return;

  const newTask: Task = {
    id: uuidv4(),
    title: todoInput.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  saveTasks();
  addListItem(newTask);
  todoInput.value = '';
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  const date = document.createElement('span');
  date.innerText = formatDate(task.createdAt);
  const closeBtn = document.createElement('span');
  closeBtn.innerText = '❌';

  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    checkbox.checked
      ? label.classList.add('crossed')
      : label.classList.remove('crossed');
    saveTasks();
  });

  closeBtn.addEventListener('click', () => {
    item.remove();
    deleteTask(task.title);
  });

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title, closeBtn, date);
  item.append(label);

  todoList?.append(item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}

function deleteTask(title: string): void {
  const filteredTasks = tasks.filter((task) => task.title !== title);
  localStorage.setItem('TASKS', JSON.stringify(filteredTasks));
}
