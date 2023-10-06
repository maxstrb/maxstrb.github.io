function CheckResult() {
    const guessRed = document.getElementById("red-channel").value;
    const guessGreen = document.getElementById("green-channel").value;
    const guessBlue = document.getElementById("blue-channel").value;

    const guessIsCorrect = evaluateGuess(guessRed, guessGreen, guessBlue);

    if (guessIsCorrect) CorrectGuess();

    else FailedGuess(guessRed, guessGreen, guessBlue);
}

function evaluateGuess(guessRed, guessGreen, guessBlue) {
    return guessRed == currentColor[0] && guessGreen == currentColor[1] && guessBlue == currentColor[2];
}

function CorrectGuess(){
    const averareCountParagraph = document.getElementById("averageGuessCount");
    
    guessHistory.push(currentAttemptCount);
    const averageAttemptCount = sum(guessHistory)/guessHistory.length.toFixed(2);
    const numberOfAttempts = guessHistory.length;

    const s = numberOfAttempts>1?'s':'';

    averareCountParagraph.innerHTML = `Average guess count: ${averageAttemptCount} Out of ${numberOfAttempts} attempt${s}`;
    alert("You won!");
    
    NewColor();
}

function FailedGuess(guessRed, guessGreen, guessBlue){
    const canvas = document.getElementById("guessedColorCanvas");
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgb(${guessRed}, ${guessGreen}, ${guessBlue})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    currentAttemptCount++;
}

function NewColor(){
    currentAttemptCount = 1;

    DrawRandomColor();
}

function DrawRandomColor() {
    currentColor = [randomNumber(0, 255, 1), randomNumber(0, 255, 1), randomNumber(0, 255, 1)];

    const canvas = document.getElementById("colorCanvas");
    const ctx = canvas.getContext("2d");

    canvas.style = `margin-bottom: 30px; box-shadow: 0px 0px 10px 10px rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, 1);`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    currentAttemptCount++;
}

function sum(l){
    return l.reduce((a, b) => a + b, 0);
}

function randomNumber(min, max, step){
    return round(Math.floor(Math.random() * (max - min) / step) * step + min, 0);
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

let currentColor = [0, 0, 0];
let currentAttemptCount = 1;
let guessHistory = [];

window.onload = () => {
    DrawRandomColor();
};