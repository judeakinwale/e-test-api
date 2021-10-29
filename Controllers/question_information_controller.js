const Question = require('../Models/question_information')

exports.getAllQuestions = async (req, res, next) => {
    const questions = await Questions.find()

    if (!questions || questions.length < 1) {
        return res.status(404).json({
            success: true,
            message: "There are no questions"
        })
    }
    res.status(200).json({
        success: true,
        data: questions
    })
}

exports.createQuestion = async (req, res, next) => {
    const question = await Questions.create(req.body)

    if (!question) {
        return res.status(400).json({
            success: true,
            message: "Invalid question details"
        })
    }
    res.status(201).json({
        success: true,
        data: question
    })
}

exports.getQuizQuestions = async (req, res, next) => {
    const questions = await Questions.find({quiz: req.params.quiz_id})

    if (!questions || questions.length < 1) {
        return res.status(404).json({
            success: true,
            message: "There are no questions"
        })
    }
    res.status(200).json({
        success: true,
        data: questions
    })
}

exports.getQuestion = async (req, res, next) => {
    const question = await Questions.findById(req.params.id)

    if (!question) {
        return res.status(404).json({
            success: true,
            message: "Question not found"
        })
    }
    res.status(200).json({
        success: true,
        data: question
    })
}

exports.updateQuestions = async (req, res, next) => {
    const question = await Questions.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!question) {
        return res.status(400).json({
            success: true,
            message: "Invalid question details"
        })
    }
    res.status(200).json({
        success: true,
        data: question
    })
}