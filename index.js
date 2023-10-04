function CheckResult() {
    if (currentDone){
        return;
    }
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
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("✓"));
        ul.appendChild(li);
        currentDone = true;

        alert("You won!");
    }
}

function ResetGuesses(){
    document.getElementById("attempts").innerHTML = '';
}

function DrawRandomAngle() {
    currentAttempt = 1;

    // Free to edit
    const lineLenght = 250;
    const arcRadius = 40;

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

currentAngle = 0;
currentAttempt = 1;
currentDone = false;

window.onload = () => {
    DrawRandomAngle();
};