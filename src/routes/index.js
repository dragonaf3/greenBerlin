let express = require('express');
let router = express.Router();

/* GET http://localhost:8000/ returns index.html */
router.get('/', function (req, res) {
    res.sendFile('index.html', {root: 'public'});
});

module.exports = router;
