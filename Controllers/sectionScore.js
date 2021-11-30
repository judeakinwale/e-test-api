const SectionScore = require('../Models/sectionScore')
const TestScore = require('../Models/testScore')
const ErrorResponse = require('../Utils/errorResponse')
const getTestScore = require('../Utils/getTestScore')
const asyncHandler = require('../Middleware/async')

// @desc    Get all section scores
// @route   GET    /api/v1/section-score
// @access  Private
exports.getAllScores = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const scores = await SectionScore.find().populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction'}
    ])

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "No scores found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Create section score
// @route   POST    /api/v1/section-score
// @access  Private
exports.createScore = asyncHandler(async (req, res, next) => {
    const score = await SectionScore.create(req.body)

    if (!score) {
        return res.status(400).json({
            success: false,
            message: "Invalid score details"
        })
    }
    res.status(201).json({
        success: true,
        data: score
    })
})

// @desc    Get section score
// @route   GET    /api/v1/section-score/:id
// @access  Private
exports.getScore = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.findById(req.params.id).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction'}
    ])

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Score not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Update section score
// @route   PUT    /api/v1/section-score/:id
// @access  Private
exports.updateScore = asyncHandler(async (req, res, next) => {
    const score = await SectionScore.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!score) {
        return res.status(400).json({
            success: false,
            message: "Invalid score details"
        })
    }
    // Calculate the test scores from the section scores
    await getTestScore(score)

    res.status(200).json({
        success: true,
        data: score
    })
})

// @desc    Delete section score
// @route   DELETE    /api/v1/section-score/:id
// @access  Private
exports.deleteScore = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.findByIdAndDelete(req.params.id)

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Score not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Get all section scores for a candidate
// @route   GET    /api/v1/section-score/candidate/:candidate_id
// @access  Private
exports.getAllCandidateScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({candidate: req.params.candidate_id}).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction'}
    ])

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Candidates scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Get all section scores for a test
// @route   GET    /api/v1/section-score/test/:test_id
// @access  Private
exports.getAllTestScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({test: req.params.test_id}).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction'}
    ])

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Test scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Get all section scores for a specific section
// @route   GET    /api/v1/section-score/section/:section_id
// @access  Private
exports.getAllSectionScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({section: req.params.section_id}).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction'}
    ])

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Section scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Get all section scores for a specific section and candidate
// @route   GET    /api/v1/section-score/section/:section_id/candidate/:candidate_id
// @access  Private
exports.getCandidateSectionScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({
        candidate: req.params.candidate_id,
        section: req.params.section_id
    }).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction'}
    ])

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Candidates scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Get all section scores for currently authenticated candidate
// @route   GET    /api/v1/section-score/self
// @access  Private
exports.getAllSelfScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({candidate: req.candidate._id}).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction'}
    ])

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Candidates scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})

// @desc    Get all section scores for a specific section and currently authenticated candidate
// @route   GET    /api/v1/section-score/self/section/:section_id
// @access  Private
exports.getSelfSectionScores = asyncHandler(async (req, res, next) => {
    const scores = await SectionScore.find({
        candidate: req.candidate._id,
        section: req.params.section_id
    }).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction'}
    ])

    if (!scores || scores.length < 1) {
        return res.status(404).json({
            success: false,
            message: "Candidates scores not found"
        })
    }
    res.status(200).json({
        success: true,
        data: scores
    })
})