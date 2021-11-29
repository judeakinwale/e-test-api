const Test = require('../Models/test')
const Section = require('../Models/section')
const Question = require('../Models/question')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')

// @desc    Get all tests
// @route   GET    /api/v1/test
// @access  Private
exports.getAllTests = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const tests = await Test.find()

    if (!tests || tests.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no tests"
        })
    }
    res.status(200).json({
        success: true,
        data: tests
    })
})

// @desc    Create test
// @route   POST    /api/v1/test
// @access  Private
exports.createTest = asyncHandler(async (req, res, next) => {
    const test = await Test.create(req.body)

    if (!test) {
        res.status(400).json({
            success: false,
            message: "Invalid test details"
        })
    }
    res.status(201).json({
        success: true,
        data: test
    })
})

// @desc    Get test
// @route   GET    /api/v1/test/:id
// @access  Private
exports.getTest = asyncHandler(async (req, res, next) => {
    const test = await Test.findById(req.params.id)

    if (!test) {
        return res.status(404).json({
            success: false,
            message: "Test not found"
        })
    }
    res.status(200).json({
        success: true,
        data: test
    })
})

// @desc    Update test
// @route   PUT    /api/v1/test/:id
// @access  Private
exports.updateTest = asyncHandler(async (req, res, next) => {
    const test = await Test.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!test) {
        res.status(400).json({
            success: false,
            message: "Invalid test details"
        })
    }
    res.status(200).json({
        success: true,
        data: test
    })
})

// @desc    Delete test
// @route   DELETE    /api/v1/test/:id
// @access  Private
exports.deleteTest = asyncHandler(async (req, res, next) => {
    const test = await Test.findByIdAndDelete(req.params.id)

    if (!test) {
        return res.status(404).json({
            success: false,
            message: "Test not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Get all sections in a test
// @route   GET    /api/v1/test/:test_id/sections
// @access  Private
exports.getTestSections = asyncHandler(async (req, res, next) => {
    const sections = await Section.find({test: req.params.id})

    if (!sections || sections.length  < 1) {
        return res.status(404).json({
            success: false,
            message: "Test not found"
        })
    }
    res.status(200).json({
        success: true,
        data: sections
    })
})

// @desc    Get all questions and sections in a test
// @route   GET    /api/v1/test/:test_id/questions
// @access  Private
exports.getAllTestQuestions = asyncHandler(async (req, res, next) => {
    const sections = await Section.find({test: req.params.id})
    let questions = []
    
    for (let i = 0; i < sections.length; i++) {
        let section = sections[i]
        let question = await Question.find({section: section.id})
        questionSet = {
            section: section,
            questions: question
        }
        questions.push(questionSet)
    }

    if (!questions || questions.length  < 1) {
        return res.status(404).json({
            success: false,
            message: "Test not found"
        })
    }
    res.status(200).json({
        success: true,
        data: questions
    })
})