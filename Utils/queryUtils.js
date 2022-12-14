// const { RestError } = require("@azure/core-http");
const {ErrorResponse, ErrorResponseJSON} = require("./errorResponse");


exports.getUserEmail = (user = undefined) => {
  return user ? user.email : undefined
}


exports.addUserDetails = async (req, updated = false) => {
  /**
   * @summary
   *  add authenticated user details to the request body
   * 
   * @param req - request object, for updating req.body
   * @param updated - specify if the details are for an update request
   */
  if (updated) {
    req.body.updatedBy = req.user._id
    req.body.updatedAt = Date.now()
  } else {
    req.body.name = req.user.fullname
    req.body.email = req.user.email
    req.body.createdBy = req.user._id
    req.body.createdAt = Date.now()
  }
}


exports.checkInstance = async (req, res, model, populate, query = {}, instanceName = "Instance", throwErr = true) => {
    /**
   * @summary
   *  check if model instance exists, check if req.params.id exists and perform logic based on that
   * 
   * @param req {req} - request object
   * @param res {res} - response object
   * @param model - model for creating model instance
   * @param populate {string / object} - query for populating model
   * @param query {object} - query for filtering the model
   * @param instanceName {string} - name to be used in error responses
   * @param throwErr {bool} - specify if errors should be thrown
   * 
   * @throws `Instance not Found!`, 404
   * @throws `This Instance already exists, update it instead!`, 400
   * 
   * @returns model instance
   */
  // instanceName = instanceName ? instanceName : "Instance"
  // console.log("model, populate, query, instanceName:", model, populate, query, instanceName)
  let instance;
  if (req.params.id) {
    instance = await model.findById(req.params.id).populate(populate)
  } else{
    instance = await model.find(query).populate(populate)
  }
  
  if (req.params.id && !instance && throwErr) {
    throw new ErrorResponse(`${instanceName} not Found!`, 404)
    // return  new ErrorResponseJSON(res, `${instanceName} not Found!`, 404);
  } else if (!req.params.id && instance.length > 0 && throwErr) {
    throw new ErrorResponse(`This ${instanceName} already exists, update it instead!`, 400)
    // return  new ErrorResponseJSON(res, `This ${instanceName} already exists, update it instead!`, 400);
  }
  return instance;
}
