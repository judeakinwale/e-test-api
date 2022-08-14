
const paramsHandler = (name, paramName) => (req, res, next) => {
  if (!paramName) paramName = `${name}Id`;
  if (paramName in req.params) req.query[name] = req.params[paramName];
  next();
}

module.exports = paramsHandler