document.getElementById("submit").addEventListener("click", function() {
    SendPassword();
});

const node = document.getElementById("password");
node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        SendPassword();
    }
});

function SendPassword() {
    var password = document.getElementById("password").value;
    document.getElementById("password").value = "";
    console.log(password);

    var url = '/submit?password=' + password;
    
    fetch(url).then(function (res) {
        res.json().then(data => {
            location.href = data.url;
        });
    });
}