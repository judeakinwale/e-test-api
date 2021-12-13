const Question = require('../Models/question')
const Section = require('../Models/section')
const CandidateResponse = require('../Models/candidateResponse')
const SectionScore = require('../Models/sectionScore')
const {getTestScore} = require('./getTestScore')

// const getSectionScore = async (response) => {
//     // const question = await Question.findById(response.question)
//     const candidateResponses = await CandidateResponse.find({
//         candidate: req.candidate.id,
//         test: response.test,
//         section: response.section
//     })
//     const getSectionScoreScore = await SectionScore.find({
//         candidate: req.candidate.id,
//         test: response.test,
//         section: response.section
//     })
    
//     let tempScore = 0
//     for (let i = 0; i < candidateResponses.length; i++) {

//         let resp = candidateResponses[i]
//         let question = await Question.findById(resp.question)

//         if (question.correct_answers == resp.selected_answers){
//             tempScore += 1
//         }
//     }

//     if (getSectionScoreScore) {
//         getSectionScoreScore.score = tempScore
//         await getSectionScoreScore.save()
//         console.log(getSectionScoreScore)
//     } else {
//         const createSectionScore = await SectionScore.create({
//             candidate: req.candidate.id,
//             test: response.test,
//             section: response.section,
//             score: tempScore
    
//         })
//         console.log(createSectionScore)
//     }

//     // finalScore = tempScore / sectionScores.length
//     // testScore.score = finalScore
//     // await testScore.save()
// }

const getSectionScore = async (req, response) => {
    // const question = await Question.findById(response.question)
    const candidateResponses = await CandidateResponse.find({
        candidate: req.candidate.id,
        test: response.test,
        section: response.section
    })
    const getSectionScoreScore = await SectionScore.findOne({
        candidate: req.candidate.id,
        test: response.test,
        section: response.section
    })
    const questions = await Question.find({
        section: response.section
    })
    
    let tempScore = 0
    let questionIds = []

    for (let i = 0; i < candidateResponses.length; i++) {

        let resp = candidateResponses[i]
        console.log("\n Response: " + resp.selected_answers[0])
        // console.log(resp.selected_answers[0])

        let question = await Question.findById(resp.question)
        console.log("\n Answer: " + question.correct_answers[0])

        
        

        console.log(question.correct_answers === resp.selected_answers)
        console.log(question.correct_answers[0] === resp.selected_answers[0])

        if (question.correct_answers[0] === resp.selected_answers[0] && !questionIds.includes(question.id)) {
            questionIds.push(question.id)
            tempScore += 1
            console.log("\n correct answers and selected answers are equal")
        }
    }
    console.log("\n Section Temp Score 01: " + tempScore)

    let sectionFinalScore = (tempScore / questions.length) * 10
    sectionFinalScore = sectionFinalScore.toFixed(2)

    console.log(`Score: ${tempScore} / Total Score: ${questions.length}`)
    console.log(`Final Section Score: ${sectionFinalScore}`)

    if (getSectionScoreScore) {
        getSectionScoreScore.score = sectionFinalScore
        await getSectionScoreScore.save()
        console.log("\n Retrieved Section Score: " + getSectionScoreScore)
        // console.log(getSectionScoreScore)

        console.log("\n Temp Score: " + tempScore)
        // console.log(tempScore)

        score = getSectionScoreScore
        await getTestScore(score)
    } else {
        const createSectionScore = await SectionScore.create({
            candidate: req.candidate.id,
            test: response.test,
            section: response.section,
            score: sectionFinalScore
    
        })
        console.log("\n Created Section Score: " + createSectionScore)

        score = createSectionScore
        await getTestScore(score)
    }

    // finalScore = tempScore / sectionScores.length
    // testScore.score = finalScore
    // await testScore.save()
}

module.exports = getSectionScore