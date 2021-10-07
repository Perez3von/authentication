const express = require('express');
const auth = require('./controllers/auth.js');
const app = express();

app.use(express.json());

app.use('/api/auth', auth);

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
