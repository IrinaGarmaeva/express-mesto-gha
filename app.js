// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to DB'))
  .catch(() => console.log('No connection to DB'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64ae2d3433fcdfb89e83e6c5',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Port is listening on port ${PORT}`);
});
