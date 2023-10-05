function CheckResult() {
    const up = '▲';
    const down = '▼';

    const ul = document.getElementById("attempts");
    const guess = document.getElementById("guess").value;

    if (guess != currentAngle) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(guess<currentAngle?up:down));
        ul.appendChild(li);

        currentAttempt++;
    }

    else{
        attemptsList.push(currentAttempt);
        currentAttempt = 1;

        document.getElementById("averageGuessCount").innerHTML = "Average guess count: " + (attemptsList.reduce((a, b) => a + b, 0) / attemptsList.length).toFixed(2) + " Out of " + attemptsList.length + " attempts.";

        alert("You won!");
        
        document.getElementById("attempts").innerHTML = '';
        DrawRandomAngle();
    }
}

function NewAngle(){
    document.getElementById("attempts").innerHTML = '';
    currentAttempt = 1;

    DrawRandomAngle();
}

function DrawRandomAngle() {
    // Free to edit
    const arcRadius = 40;
    const lineLenght = 250;

    currentAttempt = 1;

    let canvas = document.getElementById("angleCanvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let angle = Math.floor(Math.random() * 360);
    let angleInRadians = angle * Math.PI / 180;
    
    drawLine(ctx, [canvas.width/2, canvas.height/2], [canvas.width/2+lineLenght, canvas.height/2]);
    drawArc(ctx,  [canvas.width/2, canvas.height/2], arcRadius, angleInRadians, 0);
    drawLine(ctx, [canvas.width/2, canvas.height/2], [canvas.width/2 + lineLenght * Math.cos(angleInRadians), canvas.height/2 + lineLenght * Math.sin(angleInRadians)]);
    
    currentAngle = 360 - angle;
}

function drawArc(ctx, center, radius, startAngle, endAngle, stroke = '#c75252', width = 3) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }
    
    if (width) {
        ctx.lineWidth = width;
    }
    
    ctx.beginPath();
    ctx.arc(...center, radius, startAngle, endAngle);
    ctx.stroke();
}

function drawLine(ctx, begin, end, stroke = '#c75252', width = 3) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }
    
    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

let currentAngle = 0;
let currentAttempt = 1;
let attemptsList = [];

window.onload = () => {
    DrawRandomAngle();
};