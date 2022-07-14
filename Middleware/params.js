
const paramsHandler = (name, paramName) => (req, res, next) => {
  if (!paramName) paramName = `${name}Id`;
  // console.log(paramName);
  // console.log(req.params[paramName]);
  if (paramName in req.params)
    req.query[name] = req.params[paramName];

  // console.log(name);
  // console.log(req.params);
  // console.log(req.query);
  next();
}

module.exports = paramsHandler