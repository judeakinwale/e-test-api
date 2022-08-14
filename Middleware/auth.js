const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const {ErrorResponseJSON} = require("../Utils/errorResponse");
const Admin = require("../Models/admin");
const Candidate = require("../Models/candidate");
const Company = require("../Models/company");


// Grant access to authenticated user
exports.authorize = (req, res, next) => {
  if (!req.admin && !req.candidate)
    return next(new ErrorResponseJSON(res, `User is not authorized to access this route`, 403));
  next();
};


// Grant access to admin
exports.authorizeAdmin = (req, res, next) => {
  if (!req.admin) return next(new ErrorResponseJSON(res, `User is not authorized to access this route`, 403));
  next();
};


// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];  // Get token from Bearer auth in header
  } else if (req.cookies.token) {
    token = req.cookies.token;  // Get token from cookie
  }
  if (!token) {
    return next(new ErrorResponseJSON(res, "Invalid Authorization", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.admin = await Admin.findById(decoded.id);
  req.candidate = await Candidate.findById(decoded.id);
  req.company = await Company.findOne();

  // if (!req.admin && !req.candidate)
  //   return next(new ErrorResponseJSON(res, `User is not authorized to access this route`, 403));
  this.authorize(req, res, next)
  next();
});
