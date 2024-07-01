let express = require('express');
let router = express.Router();
const mongoCRUDs = require('../db/mongoCRUDs');

// Alle User finden
router.get('/', async function (req, res) {
    try {
        let users = await mongoCRUDs.findAllUsers();
        if (users) res.status(200).json(users);
        else res.status(404).send(`Users not found!`);
    } catch (err) {
        console.log(err);
        res.status(400).send("Something is not right!!");
    }
});

// Einen User finden
router.post('/', async function (req, res) {
    let userToLogin = req.body;
    let user = await mongoCRUDs.findOneUser(userToLogin.username, userToLogin.password);
    if (user) {
        res.status(200).json(user); // Benutzerinformationen ohne Passwort zurückgeben
    } else {
        res.status(401).send("Bad Login Credentials");
    }
});

// Neuen User anlegen
router.post('/create', async function (req, res) {
    try {
        const newUser = req.body;
        const userId = await mongoCRUDs.createUser(newUser);
        res.status(201).json({id: userId});
    } catch (err) {
        res.status(500).send('Error creating user');
    }
});

// Neue Route zum Löschen eines Benutzers
router.delete('/:id', async function (req, res) {
    try {
        const userId = req.params.id;
        const deleteCount = await mongoCRUDs.deleteUser(userId);
        if (deleteCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
});

module.exports = router;
