const CompanyProfile = require('../Models/companyProfile')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')
const path = require('path')

// @desc    Get Company Profile
// @route   GET     /api/v1/company
// @access  Publi/All
exports.getCompanyProfile = asyncHandler(async (req, res, next) => {
    const company = await CompanyProfile.findOne({})

    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company information not found"
        })
    }
    res.status(200).json({
        success: true,
        data: company
    })
})

// @desc    Create company profile
// @route   POST    /api/v1/company
// @access  Private
exports.createCompanyProfile = asyncHandler(async (req, res, next) => {
    const company = await CompanyProfile.create(req.body)

    if (!company) {
        return res.status(400).json({
            success: false,
            message: "Invalid company information"
        })
        // return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
    }
    res.status(201).json({
        success: true,
        data: company
    })
})

// @desc    Get all company profiles
// @route   GET     /api/v1/company/all
// @access  Private
exports.getAllCompanyProfile = asyncHandler(async (req, res, next) => {
    const company = await CompanyProfile.find()

    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company information not found"
        })
    } else if (company.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Company information not found"
        })
    }
    res.status(200).json({
        success: true,
        data: company
    })
})

// @desc    Get company profile by id
// @route   GET    /api/v1/company/:id
// @access  Private
exports.getCompanyProfileById = asyncHandler(async (req, res, next) => {
    const company = await CompanyProfile.findById(req.params.id)

    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company information not found"
        })
    }
    res.status(200).json({
        success: true,
        data: company
    })
})

// @desc    Update company profile
// @route   PUT    /api/v1/company/:id
// @access  Private
exports.updateCompanyProfile = asyncHandler(async (req, res, next) => {
    const company = await CompanyProfile.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!company) {
        return res.status(400).json({
            success: false,
            message: "Invalid company information"
        })
    }
    res.status(200).json({
        success: true,
        data: company
    })
})

// @desc    Delete company profile
// @route   DELETE    /api/v1/company/:id
// @access  Private
exports.deleteCompanyProfile = asyncHandler(async (req, res, next) => {
    const company = await CompanyProfile.findByIdAndUpdate(req.params.id)

    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company information not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Upload company logo
// @route   POST    /api/v1/company/upload-logo
// @access  Private
exports.uploadLogo = asyncHandler(async (req, res, next) => {
    if (!req.files) {
      return next(new ErrorResponse(`Please Upload a picture`, 400));
    }
  
    const file = req.files.file;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please Upload an image file`, 400));
    }
  
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(new ErrorResponse(`Please Upload an image less than 5MB`, 400));
    }

    // create a generic company title
    if (!req.company) {
        req.company = {
            title: "company",
        }
    }
  
    //create custom filename
    file.name = `logo_${req.company.title}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`An error occured while uploading`, 500));
      }
      companyLogo = await CompanyProfile.findByIdAndUpdate(req.company.id, { logo: file.name });
      if (!companyLogo) {
        return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
      }
      res.status(200).json({
        success: true,
        data: file.name,
      });
    });
  });