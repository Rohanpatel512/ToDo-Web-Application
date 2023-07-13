// Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const mysql = require('mysql2');
const replacer = require('mustache');

// Create the server with express
const app = express();

// Use the dotenv file to get confidential information.
require('dotenv').config();

// Use the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Connect to mysql database 

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

connection.connect(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log("Connected to database!");
    }
});

app.post('/signup', function(request, response) {

    // Get the information user has entered in signup form
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;
    var username = request.body.username;
    var password = request.body.password;

});

app.post('/login', function(request, response) {

    // Get the information user has entered in login form
    var username = request.body.username;
    var password = request.body.password;

    var data = {username: username, password: password};

    // Get path to the query 
    let queryPath = path.join(__dirname, 'database/query1.sql');
    let queryTemplate = fs.readFileSync(queryPath, 'utf-8');

    const queryCommand = replacer.render(queryTemplate, data);
    
    // Execute the query when user clicks login button
    connection.query(queryCommand, function(error, result){
        // Throw an error if any
        if(error) {
            throw error;
        }

        if(Object.keys(result).length != 0) {
            var user = {firstname: result.firstname};
            // User has already created account - Load the todo page.
            response.render('todo', {user: user});
        }

    });

});


// Server listens to port 2000
const server = app.listen(2000);

// Run all static files in the public directory
app.use(express.static('public'));
