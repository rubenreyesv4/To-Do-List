const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;

    addTask(taskTitle, taskDescription);

    taskForm.reset();
});

function addTask(title, description) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const taskHeader = document.createElement('div');
    taskHeader.classList.add('task-header');

    const taskTitleElement = document.createElement('h3');
    taskTitleElement.textContent = title;

    const taskDateElement = document.createElement('p');
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    taskDateElement.textContent = `Agregado el: ${formattedDate}`;

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const completeButton = createButton('Completar', function () {
        taskElement.classList.toggle('completed');
    });

    const editButton = createButton('Editar', function () {
        editTask(taskElement, taskTitleElement, title, description);
    });

    const deleteButton = createButton('Eliminar', function () {
        taskElement.remove();
    });

    taskActions.appendChild(completeButton);
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    const taskDescriptionElement = document.createElement('p');
    taskDescriptionElement.textContent = description;

    taskHeader.appendChild(taskTitleElement);
    taskHeader.appendChild(taskDateElement);
    taskHeader.appendChild(taskActions);

    taskElement.appendChild(taskHeader);
    taskElement.appendChild(taskDescriptionElement);

    taskList.appendChild(taskElement);
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', onClick);
    return button;
}

function editTask(taskElement, taskTitleElement, currentTitle, currentDescription) {
    const newTitle = prompt('Editar título:', currentTitle);
    if (newTitle !== null && newTitle !== '') {
        const newDescription = prompt('Editar descripción:', currentDescription);
        if (newDescription !== null) {
            taskTitleElement.textContent = newTitle;
            taskElement.querySelector('p').textContent = newDescription;
        }
    }
}
