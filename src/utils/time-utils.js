function toHoursMinutesAndSeconds(secondsPassed) {
    const minutes = Math.floor(secondsPassed / 60) % 60
    const unconvertedMinutes = Math.floor(secondsPassed / 60)
    const seconds = secondsPassed - unconvertedMinutes * 60
    var hours = Math.floor(secondsPassed / 3600)
    secondsPassed = secondsPassed - hours * 3600

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
        seconds
    )}`
}

function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:00`
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0')
}

export { toHoursMinutesAndSeconds, toHoursAndMinutes, padTo2Digits }
