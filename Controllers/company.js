const path = require("path");
const CompanyProfile = require("../Models/company");
const {ErrorResponseJSON, SuccessResponseJSON} = require("../Utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const {checkInstance} = require("../Utils/queryUtils")


exports.populateCompany = ""


// @desc    Get Company Profile
// @route   GET     /api/v1/company
// @access  Publi/All
exports.getCompanyProfile = asyncHandler(async (req, res, next) => {
  const company = await CompanyProfile.findOne();
  return new SuccessResponseJSON(res, company);
  // res.status(200).json(req.company);
});


// @desc    Create company profile
// @route   POST    /api/v1/company
// @access  Private
exports.createCompanyProfile = asyncHandler(async (req, res, next) => {
  await this.checkCompanyInstance(req, res, {title: req.body.title})

  const company = await CompanyProfile.create(req.body);
  return new SuccessResponseJSON(res, company, 201)
});


// @desc    Get all company profiles
// @route   GET     /api/v1/company/all
// @access  Private
exports.getAllCompanyProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


// @desc    Get company profile by id
// @route   GET    /api/v1/company/:id
// @access  Private
exports.getCompanyProfileById = asyncHandler(async (req, res, next) => {
  const company = await this.checkCompanyInstance(req, res)
  return new SuccessResponseJSON(res, company)
});


// @desc    Update company profile
// @route   PUT    /api/v1/company/:id
// @access  Private
exports.updateCompanyProfile = asyncHandler(async (req, res, next) => {
  const company = await CompanyProfile.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
  return new SuccessResponseJSON(res, company)
});


// @desc    Delete company profile
// @route   DELETE    /api/v1/company/:id
// @access  Private
exports.deleteCompanyProfile = asyncHandler(async (req, res, next) => {
  await CompanyProfile.findByIdAndUpdate(req.params.id);
  return new SuccessResponseJSON(res)
});


// @desc    Upload company logo
// @route   POST    /api/v1/company/upload-logo
// @access  Private
exports.uploadLogo = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponseJSON(res, `Please Upload a picture`, 400));
  }

  const file = req.files.file;
  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponseJSON(res, `Please Upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponseJSON(res, `Please Upload an image less than 5MB`, 400));
  }

  // create a generic company title
  if (!req.company) {
    req.company = {
      title: "company",
    };
  }

  //create custom filename
  file.name = `logo_${req.company.title}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponseJSON(res, `An error occured while uploading`, 500));
    }
    companyLogo = await CompanyProfile.findByIdAndUpdate(req.company.id, {logo: file.name});
    if (!companyLogo) {
      return next(new ErrorResponseJSON(res, "An Error Occured, Please Tray Again", 400));
    }
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});


exports.checkCompanyInstance = async (req, res, query = {}) => {
  return await checkInstance(req, res, Company, this.populateCompany, query, "Company")
}
