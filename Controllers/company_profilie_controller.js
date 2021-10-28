const CompanyProfile = require('../Models/company_profile')

// @desc    Get Company Profile
// @route   GET /api/v1/company
// @access   Private/All
exports.getCompanyProfile = async (req, res, next) => {
    const company = await CompanyProfile.find({})

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
}

exports.createCompanyProfile = async (req, res, next) => {
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
}

exports.updateCompanyProfile = async (req, res, next) => {
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
        // return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
    }
    res.status(200).json({
        success: true,
        data: company
    })
}