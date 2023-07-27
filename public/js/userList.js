let userList = [];

/**
 * Adds users new todo into the list
 * @param todo - The todo user inputs
 * @param index - The index to insert into
 */
function listAdd(todo, index) {
    userList[index] = todo;
    console.log(userList);
}

/**
 * Updates the users todo in the list
 * @param updatedTodo - The updated todo value
 * @param index - The index of todo to be updated
 */
function listUpdate(updatedTodo, index) {
    index = parseInt(index);
    userList[index - 1] = updatedTodo;
    console.log(userList);
}

/**
 * Removes users todo from the list
 * @param index - The index of todo to be deleted
 * @param nodeList - List of child node elements
 */
function listDelete(index, nodeList) {
    index = parseInt(index);
    userList.splice(index -  1, index - 1);
    
    for(var i = 0; i < nodeList.length; i++) {
        userList[i] = nodeList[i].innerText;
        
        // Convert string ID to integer
        var id = parseInt(userList[i].id);

        // Decrement value by one
        id -= 1;

        // Convert integer back to string
        var temp = "";
        temp += id;
        nodeList[i].id = temp;

    }
}

/**
 * Empties out the users list
 */
function listClean() {

}
