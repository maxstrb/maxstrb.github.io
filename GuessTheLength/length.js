function CheckResult() {
    const guess = parseFloat(document.getElementById("guess-input").value);
    const guessIsCorrect = guess === currentLength;

    if (guessIsCorrect) CorrectGuess();

    else FailedGuess(guess);
}

function CorrectGuess(){
    const averareCountParagraph = document.getElementById("averageGuessCount");
    
    guessHistory.push(currentAttemptCount);
    const averageAttemptCount = (sum(guessHistory)/guessHistory.length).toFixed(2);
    const numberOfAttempts = guessHistory.length;

    const s = numberOfAttempts>1?'s':'';

    averareCountParagraph.innerHTML = `Average guess count: ${averageAttemptCount} Out of ${numberOfAttempts} attempt${s}`;
    alert("You won!");
    
    NewLength();
}

function FailedGuess(guess){
    const attemptShower = document.getElementById("attempts");
    let currentAttemptShower = document.createElement("li");

    const up = '▲';
    const down = '▼';

    currentAttemptShower.appendChild(document.createTextNode(guess<currentLength? up:down));
    attemptShower.appendChild(currentAttemptShower);

    currentAttemptCount++;
}

function NewLength(){
    document.getElementById("attempts").innerHTML = '';
    currentAttemptCount = 1;

    DrawRandomLength();
}

function DrawRandomLength() {
    const baseLineLenght = 50;
    const maxLineLenghtMultiplier = 10;

    let baseCanvas = document.getElementById("baseLineCanvas");
    let canvas = document.getElementById("lineCanvas");

    let baseCtx = baseCanvas.getContext("2d");
    let ctx = canvas.getContext("2d");
    baseCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    currentLength = randomNumber(0, maxLineLenghtMultiplier, 0.1);

    const lineLenght = baseLineLenght * currentLength;

    drawLine(baseCtx, [baseCanvas.width/2 - baseLineLenght/2, baseCanvas.height/2], [baseCanvas.width/2 + baseLineLenght/2, baseCanvas.height/2]);
    drawLine(ctx, [canvas.width/2 - lineLenght/2, canvas.height/2], [canvas.width/2 + lineLenght/2, canvas.height/2]);
}

function drawLine(ctx, begin, end, stroke = '#0ba2f4', width = 3) {
    if (stroke) ctx.strokeStyle = stroke;
    
    if (width) ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

function sum(l){
    return l.reduce((a, b) => a + b, 0);
}

function randomNumber(min, max, step){
    return round(Math.floor(Math.random() * (max - min) / step) * step + min, 1);
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

let currentLength = 0;
let currentAttemptCount = 1;
let guessHistory = [];

window.onload = () => {
    DrawRandomLength();
};