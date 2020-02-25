const commonResponse = (req, res, next) => {
  res.data = (status, data) =>
    res.status(status || 200).send({ data: data || null });
  res.error = (status, error) => res.status(status || 500).send({ error });
  next();
};

const context = knex => (req, res, next) => {
  req.context = { knex };
  next();
};

module.exports = { commonResponse, context };
