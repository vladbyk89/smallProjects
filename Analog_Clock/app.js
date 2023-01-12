const secondsHand = document.getElementById('seconds')
const minutesHand = document.getElementById('minutes')
const hoursHand = document.getElementById('hours')


function setDate(){
    const now = new Date()
    const seconds = now.getSeconds()
    const secondsDegree = ((seconds / 60) * 360) + 90
    secondsHand.style.transform = `rotate(${secondsDegree}deg)`

    const min = now.getMinutes()
    const minDegree = ((min / 60) * 360) + 90
    minutesHand.style.transform = `rotate(${minDegree}deg)`

    const hour = now.getHours()
    const hourDegree = ((hour / 60) * 360) + 90
    hoursHand.style.transform = `rotate(${hourDegree}deg)`
}

setInterval(setDate, 1000)