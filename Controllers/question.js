const Question = require('../Models/question')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')

exports.getAllQuestions = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const questions = await Question.find()

    if (!questions || questions.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no questions"
        })
    }
    res.status(200).json({
        success: true,
        data: questions
    })
})

exports.createQuestion = asyncHandler(async (req, res, next) => {
    const question = await Question.create(req.body)

    if (!question) {
        return res.status(400).json({
            success: false,
            message: "Invalid question details"
        })
    }
    res.status(201).json({
        success: true,
        data: question
    })
})

exports.getSectionQuestions = asyncHandler(async (req, res, next) => {
    const questions = await Question.find({section: req.params.section_id})

    if (!questions || questions.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no questions"
        })
    }
    res.status(200).json({
        success: true,
        data: questions
    })
})

exports.getQuestion = asyncHandler(async (req, res, next) => {
    const question = await Question.findById(req.params.id)

    if (!question) {
        return res.status(404).json({
            success: false,
            message: "Question not found"
        })
    }
    res.status(200).json({
        success: true,
        data: question
    })
})

exports.updateQuestions = asyncHandler(async (req, res, next) => {
    const question = await Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!question) {
        return res.status(400).json({
            success: false,
            message: "Invalid question details"
        })
    }
    res.status(200).json({
        success: true,
        data: question
    })
})

exports.deleteQuestion = asyncHandler(async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id)

    if (!question) {
        return res.status(404).json({
            success: false,
            message: "Question not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})
