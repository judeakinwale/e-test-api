const Section = require('../Models/section')
const Test = require('../Models/test')
const Question = require('../Models/question')
const ErrorResponse = require('../Utils/errorResponse')
const getTestTimer = require('../Utils/getTestTimer')
const asyncHandler = require('../Middleware/async')

// @desc    Get all sections
// @route   GET    /api/v1/section
// @access  Private
exports.getAllSections = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const sections = await Section.find().populate({path: 'test', select: 'title timer'})

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

// @desc    Create section
// @route   POST    /api/v1/section
// @access  Private
exports.createSection = asyncHandler(async (req, res, next) => {
    const existingSection = await Section.findOne({
        title: req.body.title,
        test: req.body.test
    })

    if (existingSection) {
        return res.status(400).json({
            success: false,
            message: "This section already exists. Update it instead"
        })
    }

    const section = await Section.create(req.body)

    if (!section) {
        return res.status(400).json({
            success: false,
            message: "Invalid section details"
        })
    }
    // Calculate the test timer from section timers
    await getTestTimer(section)
    
    res.status(201).json({
        success: true,
        data: section
    })
})

// @desc    Get section
// @route   GET    /api/v1/section/:id
// @access  Private
exports.getSection = asyncHandler(async (req, res, next) => {
    const section = await Section.findById(req.params.id).populate({path: 'test', select: 'title timer'})

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

// @desc    Update section
// @route   PUT    /api/v1/section/:id
// @access  Private
exports.updateSection = asyncHandler(async (req, res, next) => {
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
    // Calculate the test timer from section timers
    await getTestTimer(section)

    res.status(200).json({
        success: true,
        data: section
    })
})

// @desc    Delete section
// @route   DELETE    /api/v1/section/:id
// @access  Private
exports.deleteSection = asyncHandler(async (req, res, next) => {
    const section = await Section.findByIdAndDelete(req.params.id)

    if (!section) {
        return res.status(404).json({
            success: false,
            message: "Section not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Get all sections in a test
// @route   GET    /api/v1/section/test/:test_id
// @access  Private
exports.getTestSections = asyncHandler(async (req, res, next) => {
    const sections = await Section.find({test: req.params.test_id}).populate({path: 'test', select: 'title timer'})

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

// @desc    Get sections assigned to the authenticated candidate
// @route   GET    /api/v1/section/assigned
// @access  Private
exports.getAssignedTestSections = asyncHandler(async (req, res, next) => {
    const examType = await req.candidate.examType
    // const assignedTest = await Test.findById(examType)
    const sections = await Section.find({test: examType})

    if (!sections || sections.length  < 1) {
        return res.status(404).json({
            success: false,
            message: "Assigned Sections not found"
        })
    }
    res.status(200).json({
        success: true,
        data: sections
    })
})