// handles errors thrown by middlewares and routes
function errorHandler(err, req, res, next) {
  // jwt authetication error
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "the user is not authorized" });
  }

  // valitation error
  if (err.name === "ValidationError") {
    return res.status(401).json({ message: err });
  }

  // default to 500 server error
  if (err.name === "InternalServerError") {
    return res.status(500).json(err);
  }
}

module.exports = errorHandler;
