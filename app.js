const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = 3000;

const app = express();
const middlewares = require('./middlewares');
const api = require('./api');

// Set Views
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Static Files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css',express.static(__dirname + 'public/css'))
// app.use('/js',express.static(__dirname + 'public/js'))
// app.use('/img',express.static(__dirname + 'public/img'))

app.get('',(req,res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.use('/api', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => console.info(`Listening on post ${port}`))

module.exports = app;
