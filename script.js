const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasksContainer');

let tasks = [];

function addTask() {
  const dueDate = document.getElementById('dueDate').value;
  const taskDescription = document.getElementById('taskDescription').value;

  if (new Date(dueDate) < new Date()) {
    alert('A data de vencimento não pode estar no passado. Por favor, escolha uma data futura.');
    return;
  }

  const task = {
    dueDate,
    description: taskDescription,
    completed: false,
  };

  tasks.push(task);
  displayTasks();
  taskForm.reset();
}

function displayTasks() {
  tasksContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = `task${task.completed ? ' completed' : ''}${new Date(task.dueDate) < new Date() ? ' overdue' : ''}`;
    taskElement.innerHTML = `
      <span>${task.description} - Data de Vencimento: ${task.dueDate}</span>
      <button onclick="toggleCompletion(${index})">${task.completed ? 'Desfazer' : 'Concluir'}</button>
      <button onclick="editTask(${index})">Editar</button>
      <button onclick="removeTask(${index})">Remover</button>
    `;
    tasksContainer.appendChild(taskElement);
  });
}

function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function editTask(index) {
  const newDescription = prompt('Digite a nova descrição:', tasks[index].description);
  const newDueDate = prompt('Digite a nova data de vencimento (AAAA-MM-DD):', tasks[index].dueDate);

  if (newDescription !== null && newDueDate !== null) {
    tasks[index].description = newDescription;
    tasks[index].dueDate = newDueDate;

    if (new Date(newDueDate) < new Date()) {
      alert('A data de vencimento não pode estar no passado. A tarefa será marcada como vencida.');
    }

    displayTasks();
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function filterIncompleteTasks
() {
    const incompleteTasks = tasks.filter(task => !task.completed);
    displayFilteredTasks(incompleteTasks);
  }
  
  function displayTasks() {
    tasksContainer.innerHTML = '';
  
    tasks.forEach((task, index) => {
      const taskElement = document.createElement('div');
      const currentDate = new Date();
      const taskDueDate = new Date(task.dueDate);
  
      taskElement.className = `task${task.completed ? ' completed' : ''}${taskDueDate < currentDate ? ' overdue' : ''}`;
      taskElement.innerHTML = `
        <span>${task.description} - Data de Vencimento: ${task.dueDate}</span>
        <button onclick="toggleCompletion(${index})">${task.completed ? 'Desfazer' : 'Concluir'}</button>
        <button onclick="editTask(${index})">Editar</button>
        <button onclick="removeTask(${index})">Remover</button>
      `;
      tasksContainer.appendChild(taskElement);
    });
  }
  
  function filterTasksByDescriptionOrDate() {
    const searchTerm = prompt('Digite o termo de pesquisa (descrição ou data):');
  
    if (searchTerm !== null) {
      const filteredTasks = tasks.filter(task => {
        const taskDescriptionLower = task.description.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
  
        return taskDescriptionLower.includes(searchTermLower) || task.dueDate.includes(searchTerm);
      });
  
      displayFilteredTasks(filteredTasks);
    }
  }
  
  function displayFilteredTasks(filteredTasks) {
    tasksContainer.innerHTML = '';
  
    filteredTasks.forEach((task, index) => {
      const taskElement = document.createElement('div');
      taskElement.className = `task${task.completed ? ' completed' : ''}${new Date(task.dueDate) < new Date() ? ' overdue' : ''}`;
      taskElement.innerHTML = `
        <span>${task.description} - Data de Vencimento: ${task.dueDate}</span>
        <button onclick="toggleCompletion(${index})">${task.completed ? 'Desfazer' : 'Concluir'}</button>
        <button onclick="editTask(${index})">Editar</button>
        <button onclick="removeTask(${index})">Remover</button>
      `;
      tasksContainer.appendChild(taskElement);
    });
  }
