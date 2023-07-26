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
 */
function listDelete(index) {
    index = parseInt(index);
    userList.splice(index -  1, index - 1);
    console.log(userList);
}

/**
 * Empties out the users list
 */
function listClean() {

}
