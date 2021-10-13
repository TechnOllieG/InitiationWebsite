const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function countdown() {
    const countDate = new Date(2021, 8, 10, 19, 0, 0).getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    // Calculate time left until countDate
    const textDay = Math.max(Math.floor(gap / day), 0);
    const textHour = Math.max(Math.floor((gap % day) / hour), 0);
    const textMinute = Math.max(Math.floor((gap % hour) / minute), 0);
    const textSecond = Math.max(Math.floor((gap % minute) / second), 0);
    
    countdownText.innerText = 
    (textDay <= 9 ? '0' + textDay : textDay) + ":" +
    (textHour <= 9 ? '0' + textHour : textHour) + ":" + 
    (textMinute <= 9 ? '0' + textMinute : textMinute) + ":" + 
    (textSecond <= 9 ? '0' + textSecond : textSecond);
}

countdown();
var countdownInterval = setInterval(countdown, 1000);