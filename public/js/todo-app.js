// Constants
const listContainer = document.querySelector('.todo-list-container');
const addButton = document.querySelector('#add-btn');

// Event listener 
addButton.addEventListener('click', addTodo);

/**
 * Enter key is pressed and user has entered todo, add the todo to the list
 * @param event - The key event being emitted
 */
window.addEventListener('keyup', function(event) {
    const todoValue = document.querySelector('#todo-input').value;
    if(event.key == 'Enter' && todoValue.length > 0) {
        addTodo();
    }
});

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

    // Assign ID's to both buttons
    updateBtn.id = 'update-btn';
    deleteBtn.id = 'delete-btn';

    // Get the todo user entered
    const todo = document.querySelector('#todo-input').value;

    // Create a new container to store the todo
    listElement.innerHTML = todo;
    updateBtn.innerHTML = '<i class="fa fa-refresh"></i>';
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';

    // Append all child elements to respectful containers
    listElement.appendChild(updateBtn);
    listElement.appendChild(deleteBtn);
    listContainer.appendChild(listElement);

    // Empty the input field 
    document.querySelector('#todo-input').value = '';

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