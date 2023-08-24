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

    const taskTitleElement = createHeading('h3', title);

    const taskDateElement = createParagraph(`Agregado el: ${getCurrentFormattedDate()}`);

    const taskActions = createTaskActions(taskElement, title, description);

    const taskDescriptionElement = createParagraph(description);

    taskHeader.append(taskTitleElement, taskDateElement, taskActions);

    taskElement.append(taskHeader, taskDescriptionElement);

    taskList.appendChild(taskElement);
}

function createHeading(tagName, text) {
    const heading = document.createElement(tagName);
    heading.textContent = text;
    return heading;
}

function createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
}

function getCurrentFormattedDate() {
    const currentDate = new Date();
    return `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
}

function createTaskActions(taskElement, title, description) {
    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const completeButton = createButton('Completar', function () {
        taskElement.classList.toggle('completed');
    });

    const editButton = createButton('Editar', function () {
        editTask(taskElement, title, description);
    });

    const deleteButton = createButton('Eliminar', function () {
        taskElement.remove();
    });

    taskActions.append(completeButton, editButton, deleteButton);
    return taskActions;
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', onClick);
    return button;
}

function editTask(taskElement, currentTitle, currentDescription) {
    const newTitle = prompt('Editar título:', currentTitle);
    if (newTitle !== null && newTitle !== '') {
        const newDescription = prompt('Editar descripción:', currentDescription);
        if (newDescription !== null) {
            taskElement.querySelector('h3').textContent = newTitle;
            taskElement.querySelector('p').textContent = newDescription;
        }
    }
}
