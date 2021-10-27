const CompanyProfile = require('../Models/company_profile')

exports.getCompanyProfile = (req, res) => {
    const company = CompanyProfile.find()

    if (!company) {
        return res.status(404).json({
            success: false,
            msg: "Company information not found"
        })
    }

    res.status(200).json({
        success: true,
        data: company
    })
}