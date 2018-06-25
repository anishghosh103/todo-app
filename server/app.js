const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const errorHandler = require('./libs/error-handler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, './doc')));
app.use(express.static(path.join(__dirname, './eventdoc')));

app.use(require('./libs/route-logger'));
app.use('/api', require('./api'));
app.get('/apidoc', (req, res) => {
  res.sendFile(path.join(__dirname, './doc/index.html'));
});
app.get('/eventdoc', (req, res) => {
  res.sendFile(path.join(__dirname, './eventdoc/index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use(errorHandler.notFoundHandler);
app.use(errorHandler.globalErrorHandler);

module.exports = app;