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

    // Local variables
    var invalidInfo = false;

    // Get the information user has entered in signup form
    var data = {
        firstname: request.body.firstname, 
        lastname: request.body.lastname, 
        username: request.body.username, 
        password: request.body.password
    };

    // Check if user has entered information that is empty
    for(const info in data) {
        if(data[info] == "") {
            invalidInfo = !invalidInfo;
        }
    }

    if(invalidInfo == false) {
        // User has entered information in all fields
        let queryPath = path.join(__dirname, 'database/query2.sql');
        let queryTemplate = fs.readFileSync(queryPath, 'utf-8');

        const queryCommand = getQuery('database/query2.sql', data);

        // Execute the query when user makes account
        connection.query(queryCommand, function(error, result) {

            if(error) {
                throw error;
            }

            // Checks if any other user does not have the same username
            if(result.length == 0) {
                const query = getQuery('database/query3.sql', data);
                connection.query(query, function(error, result) {
                    if(error) throw error;
                });
            }

        });

    }


});

app.post('/login', function(request, response) {

    // Get the information user has entered in login form
    var username = request.body.username;
    var password = request.body.password;

    var data = {username: username, password: password};

    const queryCommand = getQuery('database/query1.sql', data);
    
    // Execute the query when user clicks login button
    connection.query(queryCommand, function(error, result){
        // Throw an error if any
        if(error) {
            throw error;
        }

        var firstname = result[0].firstname;

        if(Object.keys(result).length != 0) {
            // User has already created account - Load the todo page.
            response.render('todo', {data : {name: firstname}});
        }
    });

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
    
    const queryCommand = replacer.render(queryTemplate, data);

    return queryCommand;


}


// Server listens to port 2000
const server = app.listen(2000);

// Run all static files in the public directory
app.use(express.static('public'));
