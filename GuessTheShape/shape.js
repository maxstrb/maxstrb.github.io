function CheckResult() {
    const guess = parseFloat(document.getElementById("guess-input").value);
    const guessIsCorrect = guess === currentShape;

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
    
    NewShape();
}

function FailedGuess(guess){
    const attemptShower = document.getElementById("attempts");
    let currentAttemptShower = document.createElement("li");

    const up = '▲';
    const down = '▼';

    currentAttemptShower.appendChild(document.createTextNode(guess<currentShape? up:down));
    attemptShower.appendChild(currentAttemptShower);

    currentAttemptCount++;
}

function NewShape(){
    document.getElementById("attempts").innerHTML = '';
    currentAttemptCount = 1;

    DrawRandomShape();
}

function DrawRandomShape() {
    const minShape = 3;
    const maxShape = 100;
    const radius = 200;

    let canvas = document.getElementById("lineCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    currentShape = randomNumber(minShape, maxShape, 1);

    const mid = [canvas.width/2, canvas.height/2];
    let startingPoint = [mid[0]+radius, canvas.height/2];

    for (let i = 0; i < currentShape; i++) {
        let nextPoint = rotatePoint(startingPoint, mid, 360/currentShape);

        drawLine(ctx, startingPoint, nextPoint, '#2E2E14');
        startingPoint = nextPoint;
    }
}

function rotatePoint(point, center, angle) {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (point[0] - center[0])) + (sin * (point[1] - center[1])) + center[0],
        ny = (cos * (point[1] - center[1])) - (sin * (point[0] - center[0])) + center[1];
    return [nx, ny];

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

let currentShape = 0;
let currentAttemptCount = 1;
let guessHistory = [];

window.onload = () => {
    DrawRandomShape();
};