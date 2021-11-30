const Question = require('../Models/question')
const CandidateResponse = require('../Models/candidateResponse')
const SectionScore = require('../Models/sectionScore')

const getSectionScore = async (response) => {
    // const question = await Question.findById(response.question)
    const candidateResponses = await CandidateResponse.find({
        candidate: req.candidate.id,
        test: response.test,
        section: response.section
    })
    const getSectionScoreScore = await SectionScore.find({
        candidate: req.candidate.id,
        test: response.test,
        section: response.section
    })
    
    let tempScore = 0
    for (let i = 0; i < candidateResponses.length; i++) {

        let resp = candidateResponses[i]
        let question = await Question.findById(resp.question)

        if (question.correct_answers == resp.selected_answers){
            tempScore += 1
        }
    }

    if (getSectionScoreScore) {
        getSectionScoreScore.score = tempScore
        await getSectionScoreScore.save()
        console.log(getSectionScoreScore)
    } else {
        const createSectionScore = await SectionScore.create({
            candidate: req.candidate.id,
            test: response.test,
            section: response.section,
            score: tempScore
    
        })
        console.log(createSectionScore)
    }

    // finalScore = tempScore / sectionScores.length
    // testScore.score = finalScore
    // await testScore.save()
}

module.exports = getSectionScore