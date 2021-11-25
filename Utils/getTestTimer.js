const Section = require('../Models/section')
const Test = require('../Models/test')


const getTestTimer = async (section) => {

    const sections = await Section.find({
        test: section.test
    })
    const test = await Test.findOne({
        test: section.test
    })
    let timer = 0
    for (let i = 0; i < sections.length; i++) {
        timer += sections[i].timer
    }
    test.timer = timer
    await test.save()
}

module.exports = getTestTimer