const Section = require('../Models/section_information')
const Question = require('../Models/question_information')

exports.getAllSections = async (req, res, next) => {
    const sections = await Section.find()

    if (!sections || sections.length < 1) {
        return res.status(404).json({
            success: true,
            message: "There are no sections"
        })
    }
    res.status(200).json({
        success: true,
        data: sections
    })
}

exports.createSection = async (req, res, next) => {
    const section = await Section.create(req.body)

    if (!section) {
        return res.status(400).json({
            success: true,
            message: "Invalid section details"
        })
    }
    res.status(201).json({
        success: true,
        data: section
    })
}

exports.getSection = async (req, res, next) => {
    const section = await Section.findById(req.params.id)

    if (!section) {
        return res.status(404).json({
            success: true,
            message: "Section not found"
        })
    }
    res.status(200).json({
        success: true,
        data: section
    })
}

exports.updateSections = async (req, res, next) => {
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
            success: true,
            message: "Invalid section details"
        })
    }
    res.status(200).json({
        success: true,
        data: section
    })
}

exports.getTestSections = async (req, res, next) => {
    const sections = await Section.find({test: req.params.test_id})

    if (!sections || sections.length < 1) {
        return res.status(404).json({
            success: true,
            message: "There are no sections"
        })
    }
    res.status(200).json({
        success: true,
        data: sections
    })
}