// Handle registration form submission
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;
    const phone_number = document.getElementById('phone_number').value;
   


    // Send data to the server for registration
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password,address,phone_number })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert('Registration failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong!');
    });
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send data to the server for login
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful');
            window.location.href = '/dashboard.html'; // Redirect to dashboard
        } else {
            alert('Invalid credentials');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong!');
    });
});
