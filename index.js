// Import stylesheets
import './style.css';

let selectedTask;

function moveInDone() {
  if (
    selectedTask &&
    document.querySelector('#progress').contains(selectedTask)
  ) {
    var data = {
      title: selectedTask.querySelector('h5').innerHTML,
      description: selectedTask.querySelector('div').innerHTML,
      completed: 'true',
      isInProgress: 'false',
    };
    fetch(`http://localhost:3000/tasks/${selectedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      location.reload();
      selectedTask.style.background = 'White';
      selectedTask = null;
    });
  }
}
document.getElementById('moveInDone').addEventListener('click', moveInDone);

function moveInProgress() {
  if (selectedTask && document.querySelector('#todo').contains(selectedTask)) {
    var data = {
      title: selectedTask.querySelector('h5').innerHTML,
      description: selectedTask.querySelector('div').innerHTML,
      completed: 'false',
      isInProgress: 'true',
    };
    fetch(`http://localhost:3000/tasks/${selectedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      location.reload();
      selectedTask.style.background = 'White';
      selectedTask = null;
    });
  }
}
document
  .getElementById('moveInProgress')
  .addEventListener('click', moveInProgress);

function submitForm() {
  // Get the input values
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;

  // Create the data to send in the request
  var data = {
    title: title,
    description: description,
    completed: 'false',
    isInProgress: 'false',
  };
  // Make the request
  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 201) {
        console.log('Task created successfully');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
document.getElementById('btn').addEventListener('click', submitForm);

fetch('http://localhost:3000/tasks')
  .then((x) => x.json())
  .then((tasks) => {
    var parent = document.getElementById('todoColumn');
    tasks.forEach((task) => {
      if (task.completed === 'true') {
        parent = document.getElementById('doneColumn');
      } else if (task.isInProgress === 'true') {
        parent = document.getElementById('inProgressColumn');
      } else {
        parent = document.getElementById('todoColumn');
      }
      parent.innerHTML += `<div class="taskBox" id="${task.id}">
        <h5>${task.title}</h5>
        <div>${task.description}</div>
      </div>`;
    });
  })
  
  .catch((error) => console.error(error));

const taskClickHandler = (event) => {
  let thisTask = event.target.closest(`.taskBox`);

  if (selectedTask) {
    selectedTask.classList.remove('selected');
  }
  if (selectedTask === thisTask) {
    selectedTask = undefined;
  } else {
    thisTask.classList.add('selected');
    selectedTask = thisTask;
  }
};

document
  .getElementById('todoColumn')
  .addEventListener('click', taskClickHandler);
document
  .getElementById('inProgressColumn')
  .addEventListener('click', taskClickHandler);
