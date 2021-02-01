var myGamePiece;
var snake = [];

function startGame() {
    myGamePiece = new component(10, 10, "red", 1, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //this.interval = setInterval(updateGameArea, 20);
		
		//pause();
    },
    clear : function() {
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


	

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 1;
    this.speedY = 0;
    this.x = x;
    this.y = y;  
	
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

function updateGameArea() {
    myGameArea.clear();
	for (var i = 0; i < snake.length; i++) {
		if (myGamePiece.x == snake[i].x && myGamePiece.y == snake[i].y) {
			clearInterval(myGameArea.interval);
			gameOver();
		}
	}
	if (myGamePiece.x <= 0 || myGamePiece.x >= myGameArea.canvas.width || myGamePiece.y <= 0 || myGamePiece.y >= myGameArea.canvas.height) {
		clearInterval(myGameArea.interval);
		gameOver();
	}
	snake.push(new component(1, 1, "green", myGamePiece.x, myGamePiece.y));
    myGamePiece.newPos(); 
    myGamePiece.update();
}

function gameOver() {
	alert("Game Over!");
}

function pause() {
	var elem = document.getElementById("pausebutton");
	if (elem.value == "Start") {
		myGameArea.interval = setInterval(updateGameArea, 20);
		elem.value = "Stop";
	}
	else {
		clearInterval(myGameArea.interval);
		elem.value = "Start";
	}
}
/**
function moveup() {
    myGamePiece.speedY -= 1; 
}
**/

/**
function movedown() {
    myGamePiece.speedY += 1; 
}
**/

function moveleft() {

	if (myGamePiece.speedX == 1) {
		myGamePiece.speedX = 0;
        myGamePiece.speedY = -1;
    }
    else if (myGamePiece.speedX == -1) {
		myGamePiece.speedX = 0;
        myGamePiece.speedY = 1;
    }
    else if (myGamePiece.speedY == -1) {
		myGamePiece.speedY = 0;
        myGamePiece.speedX = -1;
    }
    else if (myGamePiece.speedY == 1) {
		myGamePiece.speedY = 0;
        myGamePiece.speedX = 1;
    }

    //myGamePiece.speedX -= 1; 
}

function moveright() {

	if (myGamePiece.speedX == 1) {
		myGamePiece.speedX = 0;
        myGamePiece.speedY = 1;
    }
    else if (myGamePiece.speedX == -1) {
		myGamePiece.speedX = 0;
        myGamePiece.speedY = -1;
    }
    else if (myGamePiece.speedY == 1) {
        myGamePiece.speedY = 0;
        myGamePiece.speedX = -1;
    }
    else if (myGamePiece.speedY == -1) {
        myGamePiece.speedY = 0;
        myGamePiece.speedX = 1;
    }

    //myGamePiece.speedX += 1; 
}