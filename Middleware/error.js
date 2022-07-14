const {ErrorResponse, ErrorResponseJSON} = require("../Utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  // copy err into error
  let error = { ...err };
  error.message = err.message;
  // // log to console for dev
  // console.log(err.message.red);

  //Mongoose bad objectid
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  //mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplcate Field Entered";
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // res.status(error.statusCode || 500).json({
  //   success: false,
  //   error: error.message || "Server Error",
  // });
  return new ErrorResponseJSON(res, error.message || "server error", error.statusCode || 500)
};

module.exports = errorHandler;
