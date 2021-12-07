const CandidateResponse = require('../Models/candidateResponse')
const ErrorResponse = require('../Utils/errorResponse')
const getSectionScore = require('../Utils/getSectionScore')
const asyncHandler = require('../Middleware/async')

// @desc    Get all candidate response
// @route   GET     /api/v1/candidate-response
// @access  Public
exports.getAllCandidateResponses = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const candidateResponses = await CandidateResponse.find().populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction test'},
        {path: 'question', select: 'question section'}
    ])

    if (!candidateResponses || candidateResponses.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no candidate responses"
        })
    }
    res.status(200).json({
        success: true,
        data: candidateResponses
    })
})

// @desc    Create candidate response
// @route   POST    /api/v1/candidate-response
// @access  Private
exports.createCandidateResponse = asyncHandler(async (req, res, next) => {
    const candidateResponse = await CandidateResponse.create(req.body)

    if (!candidateResponse) {
        return res.status(400).json({
            success: false,
            message: "Invalid candidate response details"
        })
        // return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
    }
    await getSectionScore(candidateResponse)
    res.status(201).json({
        success: true,
        data: candidateResponse
    })
})

// @desc    Get candidate response
// @route   GET     /api/v1/candidate-response/:id
// @access  Private
exports.getCandidateResponse = asyncHandler(async (req, res, next) => {
    const candidateResponse = await CandidateResponse.findById(req.params.id).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction test'},
        {path: 'question', select: 'question section'}
    ])

    if (!candidateResponse) {
        return res.status(404).json({
            success: false,
            message: "Candidate response not found"
        })
    }
    res.status(200).json({
        success: true,
        data: candidateResponse
    })
})

// @desc    Update candidate response
// @route   PUT    /api/v1/candidate-response/:id
// @access  Private
exports.updateCandidateResponse = asyncHandler(async (req, res, next) => {
    const candidateResponse = await CandidateResponse.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!candidateResponse) {
        return res.status(400).json({
            success: false,
            message: "Invalid candidate response details"
        })
    }
    await getSectionScore(candidateResponse)
    res.status(200).json({
        success: true,
        data: candidateResponse
    })
})

// @desc    Delete candidate response
// @route   DELETE    /api/v1/candidate-response/:id
// @access  Private
exports.deleteCandidateResponse = asyncHandler(async (req, res, next) => {
    const candidateResponse = await CandidateResponse.findByIdAndDelete(req.params.id)

    if (!candidateResponse) {
        return res.status(404).json({
            success: false,
            message: "Candidate response not found"
        })
    }
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc    Get candidate response for a candidate using candidate id, test id and question id
// @route   GET    /api/v1/candidate-response/candidate/:candidate_id/test/:test_id/question/:question_id
// @access  Private
exports.getCandidateResponseByCandidateTestAndQuestion = asyncHandler(async (req, res, next) => {
    const candidateResponse = await CandidateResponse.find({
        candidate: req.params.candidate_id,
        test: req.params.test_id,
        question: req.params.question_id
    }).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction test'},
        {path: 'question', select: 'question section'}
    ])

    if (!candidateResponse) {
        return res.status(404).json({
            success: false,
            message: "Candidate response not found"
        })
    }
    res.status(200).json({
        success: true,
        data: candidateResponse
    })
})

// @desc    Get currently authenticated candidate response
// @route   GET    /api/v1/candidate-response/test/:test_id/question/:question_id
// @access  Private
exports.getCandidateResponseByTestAndQuestion = asyncHandler(async (req, res, next) => {
    const candidateResponse = await CandidateResponse.find({
        candidate: req.candidate._id,
        test: req.params.test_id,
        question: req.params.question_id
    }).populate([
        {path: 'candidate', select: 'firstName lastName email'},
        {path: 'test', select: 'title timer'},
        {path: 'section', select: 'title timer instruction test'},
        {path: 'question', select: 'question section'}
    ])

    if (!candidateResponse) {
        return res.status(404).json({
            success: false,
            message: "Candidate response not found"
        })
    }
    res.status(200).json({
        success: true,
        data: candidateResponse
    })
})

// // @desc    Get currently authenticated candidate response
// // @route   PUT    /api/v1/candidate-response/self
// // @access  Private
// exports.updateSelf = asyncHandler(async (req, res, next) => {
//     const candidateResponse = await CandidateResponse.findByIdAndUpdate(
//         req.candidate._id,
//         req.body,
//         {
//             new: true,
//             runValidators: true,
//         }
//     )

//     if (!candidateResponse) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid candidate response details"
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: candidateResponse
//     })
// })