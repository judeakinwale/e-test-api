const Section = require('../Models/section_information')
const Question = require('../Models/question_information')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')

exports.getAllSections = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const sections = await Section.find()

    if (!sections || sections.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no sections"
        })
    }
    res.status(200).json({
        success: true,
        data: sections
    })
})

exports.createSection = asyncHandler(async (req, res, next) => {
    const section = await Section.create(req.body)

    if (!section) {
        return res.status(400).json({
            success: false,
            message: "Invalid section details"
        })
    }
    res.status(201).json({
        success: true,
        data: section
    })
})

exports.getSection = asyncHandler(async (req, res, next) => {
    const section = await Section.findById(req.params.id)

    if (!section) {
        return res.status(404).json({
            success: false,
            message: "Section not found"
        })
    }
    res.status(200).json({
        success: true,
        data: section
    })
})

exports.updateSections = asyncHandler(async (req, res, next) => {
    const section = await Section.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!section) {
        return res.status(400).json({
            success: false,
            message: "Invalid section details"
        })
    }
    res.status(200).json({
        success: true,
        data: section
    })
})

exports.getTestSections = asyncHandler(async (req, res, next) => {
    const sections = await Section.find({test: req.params.test_id})

    if (!sections || sections.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no sections"
        })
    }
    res.status(200).json({
        success: true,
        data: sections
    })
})