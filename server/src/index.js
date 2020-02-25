const express = require('express');
const cors = require('cors');
const httpError = require('http-errors');
const knex = require('./config/database/knex');
const authRouter = require('./auth/authRouter');
const passport = require('./config/passport/passport');
const { commonResponse, context } = require('./config/utils');
const postRouter = require('./item-posts/postRouter');

const app = express();
const port = 8080;

app.use([
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),
  commonResponse,
  context(knex)
]);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);

app.use((err, req, res, next) => {
  console.error(err);

  if (!err.status) {
    const serverError = httpError(500);
    res.error(serverError.status, serverError);
  } else {
    res.error(err.status, err);
  }

  return next(err);
});

app.listen(port, () => console.log(`App listening on port ${port}`));
