// boards
document.addEventListener('DOMContentLoaded', () => {

const blockSize =25,
    rows = 20,
    cols = 20;
let board,
    context;

//snake head

let snakeX,
    snakeY,
    foodX,
    foodY,
    velX = 0,
    velY = 0,
    pts = 0,
    snakeBody = [],
    score = document.querySelector('.score'),
    snakeDeath = false,
    obstW,
    obstH,
    obstX,
    obstY;

    window.onload = () => {
        board = document.getElementById('board');
        board.height = blockSize * rows;
        board.width = blockSize * cols;
        context = board.getContext('2d'); // for drawing


        randomStart();
        // obstacleOne();
        placeFood();
        
        document.addEventListener('keyup', changeDirection);
        // update();
        setInterval(update, 1000/10);
  }
 //create canvas 
  function update() {

    if (snakeDeath) {
        return;
    }

  const grd = context.createLinearGradient(0,0, board.width, board.height); //create gradient
        grd.addColorStop(0, '#945ff5');
        grd.addColorStop(1, '#00a478');

    context.fillStyle = grd; //should be first
    context.fillRect(0, 0, board.width, board.height);
    //gets 0 pos and goes down right 

    //score

    context.fillStyle="#533670";
    context.shadowColor = "Black";
    context.shadowBlur = 6;
    context.shadowOffsetX = 6;
    context.shadowOffsetY = 6; 
    context.font="256px monospace";
    context.fillText(pts, 7.5*blockSize, 12.5*blockSize);

    context.fillStyle = 'Pink';
    context.fillRect(foodX, foodY, blockSize, blockSize); //draws the food with xyl

    // context.fillstyle = 'Blue'; //////////////////////////////////////////////////////////////////////////////////////
    // context.fillRect(obstX, obstY, obstW, obstH); ////////////////////////////////////////////////////

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push(foodX, foodY);
        pts += 1; //pushes the food to the body
        placeFood()
    }
    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]; // second element goes to first
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]; // updates first element ;
    }

    context.fillStyle = 'Green';
    snakeX += velX*blockSize; //checks velocity and adds blocksize for speed 
    snakeY += velY*blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize); //draws the snake with xy pos and block default size

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize); //relative to push method i-1 adds foodX and i-2 adds Y 
    }

    // death condition

    if (snakeX <0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        snakeDeath = true;
        alert('Game Over');
        window.location.reload();
    }

    for (let i =0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            snakeDeath = true;
            alert('Game Over');
            window.location.reload();
        }
  }
 }

function changeDirection(e) {
    if (e.keyCode == '38' && velY != 1) { //up
        velX = 0;
        velY = -1;
    }
     else if (e.keyCode == '40' && velY != -1) { //down
        velX = 0;
        velY = 1;
    }
     else if (e.keyCode == '37' && velX != 1) { //left
        velX = -1;
        velY = 0;
    }
    else if (e.keyCode == '39' && velX != -1) { //right
        velX = 1;
        velY = 0;
    }
}

function randomStart() {
    snakeX = Math.floor(Math.random() * cols)*blockSize;
    snakeY = Math.floor(Math.random() * rows)*blockSize;
}
function placeFood() { 
    foodX = Math.floor(Math.random() * cols)*blockSize;
    foodY = Math.floor(Math.random() * rows)*blockSize;
}

function obstacleOne() {
    obstX = blockSize * 6;
    obstY = blockSize * 8;
    obstW = blockSize * 9;
    obstH = blockSize * 3;
}
});