// Modules
const express = require('express');

// Create the server with express
const app = express();

// Server listens to port 2000
const server = app.listen(2000);



// Run all static files in the public directory
app.use(express.static('public'));