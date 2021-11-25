const Admin = require('../Models/admin')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')

// @desc    Get all admins
// @route   GET     /api/v1/admin
// @access  Public
exports.getAllAdmins = asyncHandler(async (req, res, next) => {
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
})

// @desc    Create admin
// @route   POST    /api/v1/admin
// @access  Private
exports.createAdmin = asyncHandler(async (req, res, next) => {
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
})

// @desc    Get admin
// @route   GET     /api/v1/admin/:id
// @access  Private
exports.getAdmin = asyncHandler(async (req, res, next) => {
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
})

// @desc    Update admin
// @route   PUT    /api/v1/admin/:id
// @access  Private
exports.updateAdmin = asyncHandler(async (req, res, next) => {
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
})

// @desc    Delete admin
// @route   DELETE    /api/v1/admin/:id
// @access  Private
exports.deleteAdmin = asyncHandler(async (req, res, next) => {
    const admin = await Admin.findByIdAndDelete(req.params.id)

    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Get currently authenticated admin
// @route   GET    /api/v1/admin/self
// @access  Private
exports.getSelf = asyncHandler(async (req, res, next) => {
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
})

// @desc    Get currently authenticated admin
// @route   PUT    /api/v1/admin/self
// @access  Private
exports.updateSelf = asyncHandler(async (req, res, next) => {
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
})