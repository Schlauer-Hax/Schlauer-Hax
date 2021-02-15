const fs = require('fs')

const progressBarCapacity = 30

const progressOfYear = generateYearBar()
const progressOfMonth = generateMonthBar()

function generateMonthBar() {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);
    const percentOfMonth = (now - startOfMonth) / (endOfMonth - startOfMonth)

    const passedProgressBarIndex = parseInt(percentOfMonth * progressBarCapacity)
    const progressBar = Array(progressBarCapacity)
        .fill('▁')
        .map((value, index) => index < passedProgressBarIndex ? '█' : value)
        .join('')
    return {bar: progressBar, percent: percentOfMonth}
}

function generateYearBar() {
    const thisYear = new Date().getFullYear()
    const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime()
    const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime()
    const progressOfThisYear = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear)

    const progressBarCapacity = 30
    const passedProgressBarIndex = parseInt(progressOfThisYear * progressBarCapacity)
    const progressBar = Array(progressBarCapacity)
        .fill('▁')
        .map((value, index) => index < passedProgressBarIndex ? '█' : value)
        .join('')
    return {bar: progressBar, percent: progressOfThisYear}
}


const progressbar = `\
⏳ { ${progressOfYear.bar} } - ${(progressOfYear.percent * 100).toFixed(2)}% - Year progress

⏳ { ${progressOfMonth.bar} } - ${(progressOfMonth.percent * 100).toFixed(2)}% - Month progress

⏰ Updated on ${new Date().toUTCString()}`

fs.readFile('template.md', 'utf8', (err, data) => {
    console.log(data.replace('$progressbars$', progressbar))
})
