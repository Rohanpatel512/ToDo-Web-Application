// Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const mysql = require('mysql2');

// Create the server with express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect to mysql database 
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'todo_database',
    user: 'root',
    password: 'Appdatabase1*'
});

connection.connect(function(error) {
    if(error) {
        console.log(error);
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


});


// Server listens to port 2000
const server = app.listen(2000);

// Run all static files in the public directory
app.use(express.static('public'));
