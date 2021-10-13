var holdingButton = false;
var id = -1;

function update() {
    var url = '/buttonupdate?holding=' + holdingButton.toString() + '&id=' + id;
    
    fetch(url).then(function (res) {
        res.json().then(data => {
            document.getElementById("number").innerText = data.amount.toString();
            id = parseInt(data.id);

            if(parseInt(data.amount) >= 20) {
                fetch('/buttoncomplete').then(function(res) {
                    res.json().then(data => {
                        location.href = data.url;
                    });
                });
            }
        });
    });
}

function onMouseDown() {
    console.log("onMouseDown");
    holdingButton = true;
}

function onMouseUp() {
    console.log("onMouseUp");
    holdingButton = false;
}

window.addEventListener('beforeunload', function (e) {
    holdingButton = false;
    update();
});

update();
var countdownInterval = setInterval(update, 1);