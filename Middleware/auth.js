const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const Admin = require("../Models/admin_information");
const candidate = require("../Models/candidate_information")

// // Protect routes
// exports.protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     // Set token from Bearer token in header
//     token = req.headers.authorization.split(" ")[1];
//     // Set token from cookie
//   } else if (req.cookies.token) {
//     token = req.cookies.token;
//   }

//   // Make sure token exists
//   if (!token) {
//     return next(new ErrorResponse("Not authorized to access this route", 401));
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.admin = await Admin.findById(decoded.id);

//     next();
//   } catch (err) {
//     return next(new ErrorResponse("Not authorized to access this route", 401));
//   }
// });

// // Grant access to specific roles
// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.staff.role)) {
//       return next(
//         new ErrorResponse(
//           `User role ${req.staff.role} is not authorized to access this route`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };

// Grant access to authenticated user
exports.authorize = () => {
  return (req, res, next) => {
    if (!req.admin || !req.candidate) {
      return next(
        new ErrorResponse(
          `User is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

// Grant access to admin
exports.authorizeAdmin = () => {
  return (req, res, next) => {
    if (!req.admin) {
      return next(
        new ErrorResponse(
          `User is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await Admin.findById(decoded.id)

    next();
  } catch (err) {

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      req.candidate = await candidate.findById(decoded.id);
  
      next();
    } catch (err) {
      return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  
});
