const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
var textAdded = false;

var isDone = done == 'true';
console.log(date);

if(isDone && !textAdded) {
    addText();
}

function countdown() {
    const countDate = new Date(date).getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    // Calculate time left until countDate
    const textHour = Math.max(Math.floor(gap / hour), 0);
    const textMinute = Math.max(Math.floor((gap % hour) / minute), 0);
    const textSecond = Math.max(Math.floor((gap % minute) / second), 0);
    
    countdownText.innerText = 
    (textHour <= 9 ? '0' + textHour : textHour) + ":" + 
    (textMinute <= 9 ? '0' + textMinute : textMinute) + ":" + 
    (textSecond <= 9 ? '0' + textSecond : textSecond);

    if(gap < 0 && !textAdded) {
        addText();
    }
}

function addText() {
    fetch('/countdowndone').then(function (res) {
        res.json().then(data => {
            if(textAdded) {
                return;
            }
            
            var instructions = data.response;
            var instructionsArray = instructions.split(/[\n\u0085\u2028\u2029]|\r\n?/g);

            var element = document.getElementById("text");
    
            for (let i = 0; i < instructionsArray.length; i++) {
                var line = document.createElement("p");
                var lineText = document.createTextNode(instructionsArray[i]);
                line.appendChild(lineText);

                element.appendChild(line);
            };

            var countdownPrefix = document.getElementById("countdownPrefix");
            countdownPrefix.textContent = "Expires in:";

            date = data.date;
            textAdded = true;
        });
    });
}

countdown();
var countdownInterval = setInterval(countdown, 1000);