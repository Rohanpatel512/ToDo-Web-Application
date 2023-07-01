// Local variables
let signup_btn = document.getElementById("signup-btn");

// Adds event listeners 
signup_btn.addEventListener('click', checkValid);

/**
 * Displays either login form or sign up form depending on which was clicked
 * @param id of form
 */
function showForm(formName) {

    // Get the form by id 
    const form = document.getElementById(formName);

    // Open/display the form to user 
    form.style.display = 'block';

}

/**
 * Closes either login form or sign up form depending on which was opened.
 * @param id of form 
 */
function closeForm(formName) {

    // Get the form by id
    const form = document.getElementById(formName);

    // Close the form 
    form.style.display = 'none';
}

/**
 * Function that checks if user information entered is valid
 * This function checks if firstname and lastname are valid
 * and calls help methods to check if username, and password
 * are valid.
 */
function checkValid() {

    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var username = document.getElementById('username').value; 
    var password = document.getElementById('password').value;
    var size = firstname.length;
    var isValid = false;

    if(firstname.length == 0 || lastname.length == 0) {
        alert("Invalid name!");
        return;
    }

    if(lastname.length > firstname.length) {
        size = lastname.length;
    }

    for(var i = 0; i < size; i++) {

        if(i < firstname.length) {
            
            if(isNaN(firstname[i]) == false) {
                isValid = !isValid;
                break;
            }

        }

        if(i < lastname.length) {

            if(isNaN(lastname[i]) == false) {
                isValid = !isValid;
                break;
            }

        }
    }

    if(passwordValid(password) == false) {
        isValid = !isValid;
    }

    if(usernameValid(username) == false) {
        isValid = !isValid;
    }

    if(isValid == false) {
        alert("Name, password or username is invalid!");
    }
}

/**
 * Checks if password has been entered by user (empty or not)
 * @params password - Password entered by user.
 * @returns true if password is not empty, false otherwise
 */
function passwordValid(password) {
    if(password == "") {
        return false;
    }
    return true;
}

/**
 * Checks if username has been entered by user (empty or not)
 * @params username - Username entered by user.
 * @returns true if username is not empty, false otherwise
 */
function usernameValid(username) {
    if(username == "") {
        return false;
    }
    return true;
}