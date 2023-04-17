const express = require('express');
const router = express.Router();
const fs = require('fs');

// Define the path to the JSON file that contains the user data
const usersFilePath = 'users.json';

// Define a function that retrieves the user data from the JSON file
function getUsersData() {
    const usersData = fs.readFileSync(usersFilePath, { encoding: 'utf8' });
    return JSON.parse(usersData);
}

// Authentication middleware function
function requireAuth(req, res, next) {
    // Check if the user is authenticated
    if (!username || !password) {
        res.send('Please enter a username and password');
    }
     else if (req.isAuthenticated()) {
        
        return next();
    }
   
    else {
        // If not authenticated, redirect the user to the login page
        res.redirect('/auth/login');
    }
}

// Define a route for displaying the login form
router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', function(req, res) {
    // Retrieve the username and password from the form data
    const username = req.body.username;
    const password = req.body.password;

    // Retrieve the user data from the JSON file
    const usersData = getUsersData();

    // Check if the username and password match the user data
    const user = usersData.users.find(u => u.username === username && u.password === password);

    if (user) {
        // Grant the user access to the backend and set isAuthenticated flag
        req.isAuthenticated = true;
        // Redirect the user to the chapter4 page
        res.redirect('/rock-paper-scissor');
    } else {
        // Display an error message if the credentials are invalid
        res.send('Invalid username or password.<a href="/auth/login">Go back to login page</a>');
    }
});


router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    // Retrieve the username and password from the form data
    const username = req.body.username;
    const password = req.body.password;

    // Retrieve the existing user data from the JSON file
    const usersData = require('./users.json');

    // Check if the username already exists
    const userExists = usersData.users.some(user => user.username === username);

    if (userExists) {
        // Display an error message if the username already exists
        res.send('Username already exists');
    } else {
        // Add the new user to the user data
        usersData.users.push({
            username,
            password
        });

        // Write the updated user data back to the JSON file
        fs.writeFileSync('./users.json', JSON.stringify(usersData));

         // Redirect the user back to the login page
        res.redirect('/auth/login');
    }
});

// Require authentication for the following routes
router.use(requireAuth);

router.get('/', function(req, res) {
    res.send('You are authenticated!');
});

module.exports = router;
