const fs = require('fs')

const progressBarCapacity = 30

const progressOfYear = generateYearBar()
const progressOfMonth = generateMonthBar()

function generateMonthBar() {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);
    endOfMonth.setHours(23, 59, 59, 999)
    const percent = (now - startOfMonth) / (endOfMonth - startOfMonth)

    return {bar: generateProgressbar(percent), percent: percent}
}

function generateYearBar() {
    const thisYear = new Date().getFullYear()
    const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime()
    const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime()
    const percent = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear)

    return {bar: generateProgressbar(percent), percent: percent}
}

function generateProgressbar(percent) {
    const passedProgressBarIndex = parseInt(percent * progressBarCapacity)
    return Array(progressBarCapacity)
        .fill('░')
        .map((value, index) => index < passedProgressBarIndex ? '█' : value)
        .join('')
}


const progressbar = `\
⏳ { ${progressOfMonth.bar} } - ${(progressOfMonth.percent * 100).toFixed(2)}% - Month progress

⏳ { ${progressOfYear.bar} } - ${(progressOfYear.percent * 100).toFixed(2)}% - Year progress

⏰ Updated on ${new Date().toUTCString()}`

fs.readFile('template.md', 'utf8', (err, data) => {
    console.log(data.replace('$progressbars$', progressbar))
})
