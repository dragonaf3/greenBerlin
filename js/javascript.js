document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector('form');

    const mainScreen = document.getElementById('main-screen');
    const loginScreen = document.getElementById('login-screen');

    const logoutButton = document.querySelector('#main-screen button.btn-danger');
    const addButton = document.querySelector('#main-screen button.btn-success');

    // Users and Passwords mit Rollen und Namen
    const users = [
        {
            username: "admina",
            password: "password",
            role: "admin",
            name: "Mina"
        },
        {
            username: "normalo",
            password: "password",
            role: "non-admin",
            name: "Norman"
        }
    ];

    function updateWelcomeMessage(name) {
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.textContent = "Welcome, " + name + "!";
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Verhindert das Standard-Formular-Verhalten

        // get username and password
        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        // checken ob Username und Password korrekt sind
        const user = users.find(user => user.username === enteredUsername && user.password === enteredPassword);

        if (user) {
            loginScreen.classList.add('d-none');
            mainScreen.classList.remove('d-none');
            updateWelcomeMessage(user.name);

            if (user.role === 'admin') {
                addButton.classList.remove('d-none');
            } else {
                addButton.classList.add('d-none');
            }
        } else {
            // Wenn falsch, zeige eine Fehlermeldung
            alert('Wrong username or password!');
        }
    });

    logoutButton.addEventListener('click', function () {
        // Beim Klicken auf den Logout-Button, blende den Main-Screen aus und zeige den Login-Screen an
        mainScreen.classList.add('d-none');
        loginScreen.classList.remove('d-none');
    });
});