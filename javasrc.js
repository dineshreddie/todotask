let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));

        const taskText = document.createElement('span');
        taskText.innerText = task.text;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => editTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(actions);

        taskList.appendChild(listItem);
    });

    saveTasks();
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const text = newTaskInput.value.trim();

    if (text !== '') {
        tasks.push({ text, completed: false });
        newTaskInput.value = '';
        renderTasks();
    }
}

function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

renderTasks();