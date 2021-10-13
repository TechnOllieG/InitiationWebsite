This is a website that is part of the initiation ARG for FGGP21. The website starts off with a password field.
There are two correct passwords that lead to two separate puzzles.

The first puzzle the students will encounter is the hold button puzzle.
The puzzles page contains a large button and a counter which specifies how many people are currently holding the button (including the current user).
To solve the puzzle, multiple people have to hold the button down until the amount of users reaches or surpasses a specified amount.

The second puzzle features a countdown clock that will count down from 24h as soon as someone gains access to the puzzles page.
Simultaneously, an email will be sent to oliver (change this on server.js:148) to announce that the puzzle has been accessed and it is time to lock the pepsi (along with a note to the final discord server) in a speed services locker at stockholm c.
Once the pepsi has been placed, the file countdown-instructions.txt can be updated with the directions to find the locker where the pepsi is located.
When the initial 24h countdown reaches 0, the instructions will be pasted on the site and a second countdown will start, giving the students 22h to get the pepsi before the locker expires.
When the second countdown reaches 0 nothing happens currently.

Site Customization:
In passwords.txt:
The first line specifies the password to the countdown clock which will lead to the pepsi and the discord link.
The second line specifies the password to the button hold puzzle.

In countdown-instructions.txt
The contents of this file will be pasted on the countdown page when initial countdown reaches 0, after that point another 22 hour countdown will start

To change amount of people required for button hold puzzle, change numbers in if statements on public/button.js:12 and server.js:167
To change initial countdown time (the time before the instructions pop up), change server.js:206
To change second countdown time (the time the students have to get the pepsi), change server.js:191
