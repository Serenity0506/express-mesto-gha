const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const allRouters = require('./routes/allRouters');
const { NOT_FOUND } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64789f8a0b20871c1c49536e',
  };

  next();
});

app.use(allRouters);

app.use((req, res) => {
  res.status(NOT_FOUND.code).send(NOT_FOUND.body);
});

app.listen(3000);
