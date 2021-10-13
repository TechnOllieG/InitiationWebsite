const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const nodemailer = require('nodemailer');

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen(80);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '/* Write email here */',
        pass: '/* Write password here */'
    }
});

var countdownStarted = false;
var countdownDone = false;
var date = new Date();
var accessToButton = false;
var accessToPartyCountdown = false;
var accessToChallenges = false;
var buttonsHeld = 0;
var buttonCompleted = false;
var currentIdToGive = 0;
var IdsHeld = [];

// -------- Fetch responses --------
app.get('/', function (req, res) {
    res.render('pages/index');
    console.log("User entered website");
});

app.get('/countdown', function (req, res) {
    if(countdownStarted)
        res.render('pages/countdown', {date : date.toString(), done : countdownDone.toString()});
    else
        res.redirect('/');
});

app.get('/button', function (req, res) {
    if(buttonCompleted) {
        res.redirect('/buttonclue');
        return;
    }

    if(accessToButton)
        res.render('pages/button');
    else
        res.redirect('/');
});

app.get('/countdown2', function (req, res) {
    if(accessToPartyCountdown) {
        res.render('pages/countdown2');
    }
    else
        res.redirect('/');
});

app.get('/challenges', function (req, res) {
    if(accessToChallenges) {
        res.render('pages/challenges');
    }
    else
        res.redirect('/');
});

app.get('/submit', function (req, res) {
    var localpassword = req.query.password;
    console.log("Recieved submit request with password: " + localpassword);

    try {
        const passwords = fs.readFileSync('passwords.txt', 'utf8');
        const passwordArray = passwords.split(/[\n\u0085\u2028\u2029]|\r\n?/g);
        
        if(localpassword == passwordArray[0]) {
            StartCountdown();
            res.json({url: '/countdown'});
        }
        else if(localpassword == passwordArray[1]) {
            accessToButton = true;
            console.log("Button puzzle has been unlocked!");
            res.json({url: '/button'});
        }

        if(localpassword == passwordArray[3]) {
            console.log("Students have accessed the party countdown");
            accessToPartyCountdown = true;

            var mailOptions = {
                from: 'oliverapi1337@gmail.com',
                to: 'oliver.lebert@hotmail.com',
                subject: 'Students have entered countdown website!',
                text: 'Students have typed in the correct password and the party countdown has been accessed'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

            res.json({url: '/countdown2'});
        }
        else if(localpassword == passwordArray[2]) {
            accessToChallenges = true;
            console.log("Challenges have been unlocked");

            var mailOptions = {
                from: 'oliverapi1337@gmail.com',
                to: 'oliver.lebert@hotmail.com',
                subject: 'Students have entered challenges page!',
                text: 'Students have typed in the correct password and the challenges page has been accessed'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

            res.json({url: '/challenges'});
        }
    }
    catch(err) {
        console.error(err);
    }
});

app.get('/buttonupdate', function (req, res) {
    const holding = req.query.holding == 'true';
    var id = parseInt(req.query.id);

    if(id == -1) {
        id = currentIdToGive;
        currentIdToGive++;
    }

    if(holding) {
        if(!IdsHeld.includes(id)) {
            IdsHeld.push(id);
        }
    }
    else {
        if(IdsHeld.includes(id)) {
            var index = IdsHeld.indexOf(id);
            IdsHeld.splice(index, 1);
        }
    }
    var amt = IdsHeld.length;
    res.json({amount: amt, id: id});
});

app.get('/buttoncomplete', function(req, res) {
    if(buttonCompleted || IdsHeld.length >= 20) {
        buttonCompleted = true;
        res.json({url: '/buttonclue'});
    }
    else {
        res.json({url: '/button'});
    }
});

app.get('/buttonclue', function(req, res) {
    if(buttonCompleted) {
        res.render('pages/buttonclue');
    }
    else {
        res.redirect('/button');
    }
});

app.get('/countdowndone', function(req, res) {
    const currentDate = new Date();
    if((countdownStarted && (date.getTime()) <= currentDate.getTime()) || countdownDone) {
        const instructions = fs.readFileSync('countdown-instructions.txt', 'utf8');
        if(!countdownDone) {
            countdownDone = true;
            date = new Date(new Date().getTime() + hour * 22);
        }

        res.json({response: instructions, date: date.toString()});
    }
});

app.get('/*', function(req, res) {
    res.redirect('/');
});
// -------- End fetch responses --------

function StartCountdown() {
    if(!countdownStarted) {
        countdownStarted = true;
        date = new Date(new Date().getTime() + day);
        console.log("Countdown has started!");

        var mailOptions = {
            from: 'oliverapi1337@gmail.com',
            to: 'oliver.lebert@hotmail.com',
            subject: 'Countdown has started!',
            text: 'Students have typed in the correct password and the 24h countdown has started!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}