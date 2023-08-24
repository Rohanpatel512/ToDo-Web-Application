// Constants
const formButton = document.querySelectorAll('.btn');

/**
 * Add an click event listener to each button on the home page.
 */  
formButton.forEach(function(button) {
    button.addEventListener('click', checkButton);
});


/**
 * Check whether login or signup button was clicked and displays that form.
 */
function checkButton(event) {
    let formID = event.target.formTarget;
    showForm(formID);
}

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
 * Closes an error or success messages.
 * @param id of message to be closed 
 */
function closeMessage(id) {
    console.log("Closing: " + id);
    const message = document.getElementById(id);
    message.style.display = 'none';

}

/**
function closeError() {

    // Get the error container by id 
    const error = document.getElementById("error-message");
    error.style.display = 'none';
}


function closeUsernameError() {
    // Get the error container by id 
    const error = document.getElementById("error-message-2");
    error.style.display = 'none';
}

function closeAlert() {
   // Get the alert container by id 
   const alert = document.getElementById("alert-message");
   alert.style.display = 'none';
}

function closeSuccessMessage() {
  const success = document.getElementById("success-message");
  success.style.display = 'none';
}
*/