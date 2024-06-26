const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const locationsRouter = require('./routes/locations');

let app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/loc', locationsRouter);

app.use(function(req, res) {
  res.status(404).send('Not found: ' + req.path);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send('error: ' + err.message);
});

module.exports = app;
