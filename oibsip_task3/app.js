document.addEventListener("DOMContentLoaded", ()=> {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(storedTasks) {
        storedTasks.forEach((task)=> tasks.push(task));
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = ()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('taskDescription');
    const text = taskInput.value.trim();
    const description = descriptionInput.value.trim();

    if(text) {
        const timestamp = new Date().toLocaleString(); // Get current date and time
        tasks.push({task: text, description, completed: false, timestamp});
        taskInput.value = "";
        descriptionInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].task;

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = ()=> {
    const completeTasks = tasks.filter(task=> task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100; 

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerHTML = `${completeTasks} / ${totalTasks}`;

    if(tasks.length && completeTasks == totalTasks) {
        blastConfetti();
    }
}

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed? "checked":""}>
                <p>${task.task}</p>
                <p class="description">${task.description}</p>
                <span class="timestamp">${task.timestamp}</span> <!-- Display timestamp -->
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})" />
                <img src="./img/bin.png" onClick="deleteTask(${index})"/>
            </div>
        </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index))
        taskList.append(listItem);
    })
};
document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault();

    addTask();
});

const blastConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
