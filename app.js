// Modules
const express = require('express');
const bodyParser = require('body-parser');

// Create the server with express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

    console.log(username + " " + password);

});




// Server listens to port 2000
const server = app.listen(2000);

// Run all static files in the public directory
app.use(express.static('public'));