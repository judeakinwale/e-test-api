const Candidate = require('../Models/candidate_information')
const ErrorResponse = require('../Utils/errorResponse')
const asyncHandler = require('../Middleware/async')

exports.getAllCandidates = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults);

    const candidates = await Candidate.find()

    if (!candidates || candidates.length < 1) {
        return res.status(404).json({
            success: false,
            message: "There are no candidates"
        })
    }
    res.status(200).json({
        success: true,
        data: candidates
    })
})

exports.createCandidate = asyncHandler(async (req, res, next) => {
    const candidate = await Candidate.create(req.body)

    if(Object.keys(req.body).length === 0) {
        return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
    }

    if (!candidate) {
        return res.status(400).json({
            success: false,
            message: "Invalid candidate details"
        })
        // return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
    }
    res.status(201).json({
        success: true,
        data: candidate
    })
})

exports.getCandidate = async (req, res, next) => {
    const candidate = await Candidate.findById(req.params.id)

    if (!candidate) {
        return res.status(404).json({
            success: false,
            message: "Candidate not found"
        })
    }
    res.status(200).json({
        success: true,
        data: candidate
    })
}

exports.updateCandidate = async (req, res, next) => {
    const candidate = await Candidate.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!candidate) {
        return res.status(400).json({
            success: false,
            message: "Invalid candidate details"
        })
    }
    res.status(200).json({
        success: true,
        data: candidate
    })
}

exports.getSelf = async (req, res, next) => {
    const candidate = await Candidate.findById(req.candidate._id)

    if (!candidate) {
        return res.status(404).json({
            success: false,
            message: "Candidate not found"
        })
    }
    res.status(200).json({
        success: true,
        data: candidate
    })
}

exports.updateSelf = async (req, res, next) => {
    const candidate = await Candidate.findByIdAndUpdate(
        req.candidate._id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!candidate) {
        return res.status(400).json({
            success: false,
            message: "Invalid candidate details"
        })
    }
    res.status(200).json({
        success: true,
        data: candidate
    })
}