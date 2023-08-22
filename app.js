// Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const mysql = require('mysql2');
const replacer = require('mustache');
const { check, validationResult } = require('express-validator');
const { response } = require('express');
const session = require('express-session');
let loggedInUsername = "";


const validations = [
    check('firstname').isLength({min: 2, max:30}).withMessage('Please enter valid first name.'),
    check('lastname').isLength({min:2, max:30}).withMessage('Please enter valid last name'),
    check('username').isLength({min:6}).withMessage('Please enter valid username'),
    check('password').isStrongPassword()
    .withMessage("Password needs 1 uppercase, 1 special character, 1 lowercase and 1 number. Minimum length must be 8")
];

// Create the server with express
const app = express();

// Use the dotenv file to get confidential information.
require('dotenv').config();

// Use the body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use a session to keep track of templates being rendered 
app.use(session({secret: process.env.SESSION, resave: true, saveUninitialized: true}));

// Connect to mysql database 
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

// Connect to the database.
connection.connect(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log("Connected to database!");
    }
});

app.get('/', function(request, response) {    
    
    if(request.session.currentTemplate === undefined) {
        response.render('index', {error: {message: ''}, error2: {message: ''}, success: {message: ''}});
    }
    
});

app.get('/getData', function(request, response) {

    // Set the data to be the username of user
    data = loggedInUsername;

    // Get query to retrieve data from database
    const queryCommand = getQuery('database/query5.sql', data);

    connection.query(queryCommand, function(error, result) {
        // Display an error if any
        if(error) throw error;

        console.log("Data retrieved: " + result);
    });

});

app.post('/', validations, function(request, response) {

    // Get the information user has entered in signup form
    var data = {
        firstname: request.body.firstname, 
        lastname: request.body.lastname, 
        username: request.body.username, 
        password: request.body.password
    };

    // Get all validation errors 
    const validationError = validationResult(request);


    if(!validationError.isEmpty()) {

        // Send an alert to client for invalid information
        const alert = validationError.array();
        response.render('index', {error: {message: ''}, error2: {message: ''}, success: {message: ''}, alert});

    } else {

        // Get sql query to be executed
        const queryCommand = getQuery('database/query2.sql', data);

        // Run the query to check for existing usernames.
        connection.query(queryCommand, function(error, result){
            if(error) {
                throw error;
            }
            // Check if username is unique to the user.
            if(result.length == 0) {
                // Load up home page letting user know their account has successfully been created.
                var successMessage = 'Succcessfully created account. You may login now!'
                response.render('index', {error: {message: ''}, error2: {message: ''}, 
                success: {message: successMessage}});
                // Insert the users data into the database.
                const query = getQuery('database/query3.sql', data);
                insertUser(query);
            } else {
                // Send an error to client saying that username is already taken.
                response.render('index', {error: {message: ''}, error2: {message: 'Username is already taken.'},
                success: {message: ''}});
            }
        });

    }

});

app.post('/login', function(request, response) {

    // Get the information user has entered in login form
    var username = request.body.username;
    var password = request.body.password;

    loggedInUsername = username;

    var data = {username: username, password: password};

    const queryCommand = getQuery('database/query1.sql', data);
    
    // Execute the query when user clicks login button
    connection.query(queryCommand, function(error, result) {
        // Throw an error if any
        if(error) {
            throw error;
        }

        if(Object.keys(result).length != 0) {
            var firstname = result[0].firstname;
            // User has already created account - Load the todo page.
            request.session.currentTemplate = 'todo';
            response.render('todo', {data: {name: firstname}})
        } else {
            // Send an error to client to let user know login information was invalid.
            var message = 'Invalid username and/or password, or user may have not created account.';
            response.render('index', {error: {message: message}, error2: {message: ''}, success: {message: ''}});
        }
    });

});

app.post('/sendData', function(request, response) {

    const jsonData = JSON.stringify(request.body)

    // Store all data that are going to be used as parameters to sql query in object
    var data = {todo: jsonData, username: loggedInUsername};

    // Get the query to be executed
    const queryCommand = getQuery('database/query4.sql', data);

    // Execute the query 
    connection.query(queryCommand, function(error, result) {
        if(error) {
            throw error;
        }
    });

    request.session.currentTemplate = undefined;
    response.send("Sent");

});
    


/**
 * Gets the query to be exectued from file
 * @param filePath to the sql file containing query
 * @param data the data to send as parameters
 */
function getQuery(filePath, data) {

    // Get path to the query 
    let queryPath = path.join(__dirname, filePath);
    let queryTemplate = fs.readFileSync(queryPath, 'utf-8');
    
    // Store the actual values in the placeholders
    const queryCommand = replacer.render(queryTemplate, data);

    // Return the query 
    return queryCommand;
}

/**
 * Inserts new user info into database
 * @param query for to store in database
 */
function insertUser(query) {

    connection.query(query, function(error, result){
        if(error) {
            throw error;
        }
    });

}

// Server listens to port 2000
const server = app.listen(2000);

// Run all static files in the public directory
app.use(express.static(__dirname + '/public'));
