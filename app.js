const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const allRouters = require('./routes/allRouters');

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

app.listen(3000);
