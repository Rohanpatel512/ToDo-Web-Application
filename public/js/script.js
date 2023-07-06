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