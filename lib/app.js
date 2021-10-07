const express = require('express');
const auth = require('./controllers/auth.js');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser()); 

app.use('/api/auth', auth);

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
