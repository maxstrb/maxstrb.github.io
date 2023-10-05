function CheckResult(){
    const up = '▲';
    const down = '▼';

    const ul = document.getElementById("attempts");
    const guess = document.getElementById("guess-input").value;

    if (guess != currentLength){
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(currentLength>guess?up:down));
        ul.appendChild(li);

        currentAttempt++;
    }

    else{
        attemptsList.push(currentAttempt);
        currentAttempt = 1;

        document.getElementById("averageGuessCount").innerHTML = "Average guess count: " + (attemptsList.reduce((a, b) => a + b, 0) / attemptsList.length).toFixed(2) + " attempts";

        alert("You won!");
        
        document.getElementById("attempts").innerHTML = '';
        DrawRandomLength();
    }
}

function DrawRandomLength(){
    currentAttempt = 1;

    let currLInPx = Math.floor(Math.random() * 50) * 10;
    currentLength = currLInPx/50;

    let baseCanvas = document.getElementById("baseLineCanvas");
    let canvas = document.getElementById("lineCanvas");
    
    let baseCtx = baseCanvas.getContext("2d");
    let ctx = canvas.getContext("2d");
    
    baseCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let baseLineLength = 50;
    
    drawLine(baseCtx, [baseCanvas.width/2-baseLineLength/2, baseCanvas.height/2], [baseCanvas.width/2+baseLineLength/2, baseCanvas.height/2]);
    drawLine(ctx, [canvas.width/2-currLInPx/2, canvas.height/2], [canvas.width/2+currLInPx/2, canvas.height/2]);
    console.log("New length: " + currentLength);
}

function drawLine(ctx, begin, end, stroke = '#0ba2f4', width = 3) {
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

let currentLength = 0;
let currentAttempt = 1;
let attemptsList = [];

window.onload = () => {
    DrawRandomLength();
};