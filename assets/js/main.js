const addForm = document.querySelector('.add');
const list = document.querySelector('.list');
const search = document.querySelector('.search input');

// Adding tasks

const createTask = task => {
  const html = `
    <li class="list__item">
      <span>${task}</span><i class="delete fas fa-trash"></i>
    </li>
  `;
  list.innerHTML += html;
};

addForm.addEventListener('submit', event => {
  event.preventDefault();
  const task = addForm.add.value.trim();
  if (task.length) {
    createTask(task);
    addForm.reset();
  }
});

// Deleting tasks

list.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    event.target.parentElement.remove();
  }
});

// Searching tasks

const filterTasks = inputText => {
  Array.from(list.children)
    .filter(task => !task.textContent.toLowerCase().includes(inputText)
    .forEach(task => task.classList.add('filtered')));

  Array.from(list.children)
    .filter(task => task.textContent.toLowerCase().includes(inputText)
    .forEach(task => task.classList.remove('filtered')));
};

search.addEventListener('keyup', () => {
  const inputText = search.value.trim().toLowerCase();
  filterTasks(inputText);
});
