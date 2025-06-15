function CheckResult() {
    const guess = parseInt(document.getElementById("guess-input").value);
    const guessIsCorrect = guess === currentAngle;

    console.log(`Guess: ${guess}, correct: ${currentAngle}, isCorrect: ${guessIsCorrect}`);

    if (guessIsCorrect) CorrectGuess();

    else FailedGuess(guess);
}

function CorrectGuess(){
    const averareCountParagraph = document.getElementById("averageGuessCount");
    
    guessHistory.push(currentAttemptCount);
    const averageAttemptCount = (sum(guessHistory)/guessHistory.length).toFixed(2);
    const numberOfAttempts = guessHistory.length;

    const s = numberOfAttempts>1?'s':'';

    averareCountParagraph.innerHTML = `Average guess count: ${averageAttemptCount}<br>Out of ${numberOfAttempts} attempt${s}`;
    alert("You won!");
    
    NewAngle();
}

function FailedGuess(guess){
    const attemptShower = document.getElementById("attempts");
    let currentAttemptShower = document.createElement("li");

    const up = '▲';
    const down = '▼';

    currentAttemptShower.appendChild(document.createTextNode(guess<currentAngle? up:down));
    attemptShower.appendChild(currentAttemptShower);

    currentAttemptCount++;
}

function NewAngle(){
    document.getElementById("attempts").innerHTML = '';
    currentAttemptCount = 1;

    DrawRandomAngle();
}

function DrawRandomAngle() {
    const arcRadius = 40;
    const lineLenght = 225;

    let canvas = document.getElementById("angleCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    currentAngle = randomNumber(0, 360, 1);
    let angleInRadians = -currentAngle * Math.PI / 180;
    
    drawLine(ctx, [canvas.width/2, canvas.height/2], [canvas.width/2+lineLenght, canvas.height/2]);
    drawArc(ctx,  [canvas.width/2, canvas.height/2], arcRadius, angleInRadians, 0);
    drawLine(ctx, [canvas.width/2, canvas.height/2], [canvas.width/2 + lineLenght * Math.cos(angleInRadians), canvas.height/2 + lineLenght * Math.sin(angleInRadians)]);
}

function drawArc(ctx, center, radius, startAngle, endAngle, stroke = '#c75252', width = 3) {
    if (stroke) ctx.strokeStyle = stroke;
    
    if (width) ctx.lineWidth = width;
    
    ctx.beginPath();
    ctx.arc(...center, radius, startAngle, endAngle);
    ctx.stroke();
}

function drawLine(ctx, begin, end, stroke = '#c75252', width = 3) {
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
    return Math.floor(Math.random() * (max - min) / step) * step + min;
}

let currentAngle = 0;
let currentAttemptCount = 1;
let guessHistory = [];

window.onload = () => {
    DrawRandomAngle();
};
