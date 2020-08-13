module.exports = function(customResponse) {
  return function (error, req, res, next) {
    if (error instanceof SyntaxError) {
      const defaultErrorMessage = { status: 'fail',
      message: 'The server is unable to process your request as it is badly malformed!' }
      return res.status(400).send(customResponse || defaultErrorMessage );
    } else {
      next();
    }
  }
}
