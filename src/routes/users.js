let express = require('express');
let router = express.Router();
const mongoCRUDs = require('../db/mongoCRUDs');

router.get('/', async function(req, res) {
  try {
    let users = await mongoCRUDs.findAllUsers();
    if (users) res.status(200).json(users);
    else res.status(404).send(`Users not found!`);
  } catch (err) {
    console.log(err);
    res.status(400).send("Something is not right!!");
  }
});

router.post('/', async function(req, res) {
  let userToLogin = req.body;
  let user = await mongoCRUDs.findOneUser(userToLogin.username, userToLogin.password);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).send("Bad Login Credentials");
  }
});

module.exports = router;
