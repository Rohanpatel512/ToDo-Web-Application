// Constants
const listContainer = document.querySelector('.todo-list-container');
const addButton = document.querySelector('#add-btn');

// Event listener 
addButton.addEventListener('click', addTodo);

/**
 * Creates a todo container and adds it to the list of todo's
 */
function addTodo() {

    const listElement = document.createElement('div');
    const updateBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    // Add click event listeners to update and delete button
    updateBtn.addEventListener('click', updateTodo);
    deleteBtn.addEventListener('click', deleteTodo);

    // Get the todo user entered
    const todo = document.getElementById('todo-input').value;

    // Create a new container to store the todo
    listElement.innerHTML = todo;
    updateBtn.innerText = 'Update';
    deleteBtn.innerText = 'Delete';

    // Append all child elements to respectful containers
    listElement.appendChild(updateBtn);
    listElement.appendChild(deleteBtn);
    listContainer.append(listElement);

}

/**
 * Removes a todo from list 
 */
function deleteTodo() {

    console.log('deleting todo...');

}

/**
 * Updates a todo from list
 */
function updateTodo() {

    console.log('updating todo...');

}

/**
 * Removes all the todo's within the list
 */
function clearTodo() {


}