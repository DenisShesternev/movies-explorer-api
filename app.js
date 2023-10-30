require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');

const { PORT = 3000, MONGODB = 'mongodb://127.0.0.1:27017/moviesAndUsersBD' } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт.');
  }, 0);
});

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect(MONGODB);

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT} порту`);
});
