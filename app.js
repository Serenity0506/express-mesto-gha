const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const allRouters = require('./routes/allRouters');
const { handleExceptions } = require('./middlewares/errorMiddleware');
const { NOT_FOUND } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(bodyParser.json());

app.use(allRouters);

app.use(errors());

app.use(handleExceptions);

app.use((req, res) => {
  res.status(NOT_FOUND.code).send(NOT_FOUND.body);
});

app.listen(3000);
