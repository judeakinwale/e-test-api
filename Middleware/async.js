const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// const asyncHandler = fn => async (req, res, next) => {
//   try {return await fn(req, res, next);} catch (err) {next(err);}
// };

/**
// For non server related middleware
const asyncHandler =  fn => async (...args) => {
  try {return await fn(...args)} catch (err) {console.log(`Error: ${err}`)}
};
*/

module.exports = asyncHandler;
