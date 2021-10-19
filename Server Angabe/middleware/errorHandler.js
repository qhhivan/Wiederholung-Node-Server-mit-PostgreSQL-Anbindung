/* eslint no-unused-vars: off */

const errorHandler = (err, req, res) => {
  console.log('Error => ', err.message.red);
  res.status(500).json({
    code: 500,
    data: 'Server error',
  });
};

const notFoundHandler = (req, res) => {
  console.log('Error => ', req.originalUrl.blue);
  res.status(404).json({
    code: 404,
    data: 'The requested page does not exist.',
  });
};

module.exports = { errorHandler, notFoundHandler };
