// Constants
const listContainer = document.querySelector('.todo-list-container');
const addButton = document.querySelector('#add-btn');
const clearButton = document.querySelector('#clear-btn');
const update = document.querySelector('#update');
const cancel = document.querySelector("#cancel");
const logout = document.querySelector("#logout");

// Variables 
let listCount = 0;
let selected = null;

// Event listener 
addButton.addEventListener('click', addTodo);
clearButton.addEventListener('click', clearTodo);
update.addEventListener('click', updateTodo);
cancel.addEventListener('click', hideUpdateModal);
logout.addEventListener('click', logoutUser);

window.onload = function() {
    getUserData();
}

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
 * Function that shows update modal
 */
function showUpdateModal(event) {
    // Get the list element that user is updating
    selected = event.currentTarget.parentNode;
    // Display the update modal to user 
    const updateModal = document.querySelector(".update-modal");
    updateModal.style.display = 'block';
}

/**
 * Function that hides the update modal
 */
function hideUpdateModal() {
    // Hide the update modal from user
    const updateModal = document.querySelector(".update-modal");
    updateModal.style.display = 'none';
}

/**
 * Function that adds update and delete buttons to the list element
 * @param listElement - The element that stores the todo and buttons
 */
function addButtons(listElement) {

    const updateBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    // Add click event listeners to update and delete button
    updateBtn.addEventListener('click', showUpdateModal, false);
    deleteBtn.addEventListener('click', deleteTodo, false);

    // Assign ID's to both buttons
    updateBtn.id = 'update-btn';
    deleteBtn.id = 'delete-btn';

    updateBtn.innerHTML = '<i class="fa fa-refresh"></i>';
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';

    listElement.appendChild(updateBtn);
    listElement.appendChild(deleteBtn);

}

/**
 * Creates a todo container and adds it to the list of todo's
 */
function addTodo() {

    var nameID = "";

    // Get the todo user entered
    const todo = document.querySelector('#todo-input').value;

    // Create a new div element to be part of the list
    const listElement = document.createElement('div');

    // Increase list count value by one, and assign the list element a list count for class name.
    listCount += 1;
    nameID += listCount;
    listElement.id = nameID;

    // Create a new container to store the todo
    listElement.innerText = todo;

    // Add the delete and update buttons 
    addButtons(listElement);

    // Append all child elements to respectful containers
    listContainer.appendChild(listElement);

    // Empty the input field 
    document.querySelector('#todo-input').value = '';

}

/**
 * Removes a todo from list 
 * @event - The event emitted 
 */
function deleteTodo(event) {

    // Get the id of list element to be deleted
    const parentID = event.currentTarget.parentNode.id;
    
    // Get the list element to be deleted by using its id
    const listElement = document.getElementById(parentID);

    // Get the container that holds the list element
    const listContainer = listElement.parentElement;

    // Remove the list element from container
    listContainer.removeChild(listElement);

}

/**
 * Updates a todo from list
 */
function updateTodo() {

    // Get the updated todo value from user.
    const updatedTodo = document.querySelector('#update-input').value;

    // Get the name of the div element to be updated
    var elementID = selected.id;

    // Get the list element to be updated by id
    const listElement = document.getElementById(elementID);

    // Update the list element
    listElement.innerText = updatedTodo;

    addButtons(listElement);

}

/**
 * Removes all the todo's within the list
 */
function clearTodo() {
    // Get the list container that holds all todo's
    const listContainer = document.querySelector('.todo-list-container');
    // Remove all the todo's
    listContainer.replaceChildren();
}

/**
 * Logs user out from their account 
 * Saves users todo's into an array 
 */
function logoutUser() {
 
   const listContainer = document.querySelector('.todo-list-container'); 
   const todoArray = toArray(listContainer.childNodes);
   const json = JSON.stringify(todoArray); 

   // URL of node.js server
   const url = "http://localhost:2000/sendData";
   // Create a new http request
   const httpRequest = new XMLHttpRequest();
   
   // Request configuration
   httpRequest.open("POST", url);
   httpRequest.setRequestHeader("Content-type", "application/json");


   httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === 4) {
        if(httpRequest.status === 200) {
            if(httpRequest.response === "Sent") {
                window.location.href = '/';
            }
        }
    }
   }

   // Send the data 
   httpRequest.send(json);
} 

/**
 * Gets user todo data from server when they login
 */
function getUserData() {

    // URL of node.js server
    const url = "http://localhost:2000/getData";

    // Create a new http request
    const httpRequest = new XMLHttpRequest();

    // Request configuration
    httpRequest.open("GET", url);
    httpRequest.setRequestHeader("Content-type", "application/json");

    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState === 4 && httpRequest.status === 200) {
            const serverData = httpRequest.responseText;
        }
    }

    httpRequest.send();

}

/**
 * Converts a node list to an array
 * @param nodeList - The node list of todo's
 */
 function toArray(nodeList) {

    let userList = [];

    for(var i = 0; i < nodeList.length; i++) {
        userList.push(nodeList[i].innerText);
    }

    return userList;
}


