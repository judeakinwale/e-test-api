const Admin = require('../Models/admin_information')

exports.getAllAdmins = async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const admins = await Admin.find()

    if (!admins || admins.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no admins"
        })
    }
    res.status(200).json({
        success: true,
        data: admins
    })
}

exports.createAdmin = async (req, res, next) => {
    const admin = await Admin.create(req.body)

    if (!admin) {
        return res.status(400).json({
            success: false,
            message: "Invalid admin details"
        })
    }
    res.status(201).json({
        success: true,
        data: admin
    })
}

exports.getAdmin = async (req, res, next) => {
    const admin = await Admin.findById(req.params.id)

    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found"
        })
    }
    res.status(200).json({
        success: true,
        data: admin
    })
}

exports.updateAdmin = async (req, res, next) => {
    const admin = await Admin.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!admin) {
        return res.status(400).json({
            success: false,
            message: "Invalid admin details"
        })
    }
    res.status(200).json({
        success: true,
        data: admin
    })
}

exports.getSelf = async (req, res, next) => {
    const admin = await Admin.findById(req.admin._id)

    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found"
        })
    }
    res.status(200).json({
        success: true,
        data: admin
    })
}

exports.updateSelf = async (req, res, next) => {
    const admin = await Admin.findByIdAndUpdate(
        req.admin._id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!admin) {
        return res.status(400).json({
            success: false,
            message: "Invalid admin details"
        })
    }
    res.status(200).json({
        success: true,
        data: admin
    })
}