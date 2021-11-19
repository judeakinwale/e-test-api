const Section = require('../Models/section')
const Test = require('../Models/test')


const getTestTimer = async (section) => {

    console.log(`section.id: ${section.id}, section.timer: ${section.timer}`)
    const sections = await Section.find({
        test: section.test
    })
    console.log(`sections: ${sections}`)
    const test = await Test.findOne({
        test: section.test
    })
    console.log(`test: ${test}`)
    let timer = 0
    for (let i = 0; i < sections.length; i++) {
        console.log(`Individual section model: ${sections[i]} \n`)
        timer += sections[i].timer
    }
    console.log(`timer: ${timer}`)
    // timer = timer / sections.length
    test.timer = timer
    await test.save()
    console.log(`test timer: ${test.timer}`)

}

module.exports = getTestTimer