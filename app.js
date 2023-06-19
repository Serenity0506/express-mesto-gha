const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const allRouters = require('./routes/allRouters');
const { handleExceptions } = require('./middlewares/errorMiddleware');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(helmet());

app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(allRouters);

app.use(errors());

app.use(handleExceptions);

app.listen(3000);
