// server.js
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const port =3000;

// Middleware

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MySQL Database connection   
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Use your MySQL username
    password: 'sanjitkour@gmail.com9149',  // Use your MySQL password
    database: 'foodwaste'  // Your MySQL database name
});



db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' ,err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));


// Define a route for the root URL (/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });


 app.get('/public/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.get('/public/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
  });


// Register endpoint
app.post('/register', (req, res) => {
    const { username, email, password ,address,phone_number} = req.body;


    // Check if user already exists
    db.query('SELECT * FROM user_table WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Server error' });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: 'Username already taken' });
        }

        // Hash the password before saving to the database
        const hashedPassword = bcrypt.hashSync(password,10);

        console.log(req.body);  // Check if 'password' exists in the body


        // Insert new user into the database
        db.query('INSERT INTO user_table (username, email, password,address,phone_number) VALUES (?, ?, ?, ?, ?)', [username, email,hashedPassword,address,phone_number], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: 'Error registering user' });
            }
            res.json({ success: true, message: 'User registered successfully' });
        });
    });

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the database
    db.query('SELECT * FROM user_table WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Server error' });
        }

        if (results.length === 0) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Compare the entered password with the stored hashed password
        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(hashedPassword, user.password);

        if (isPasswordValid) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
})});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
