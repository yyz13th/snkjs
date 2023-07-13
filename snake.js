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
    velY = 0;

    window.onload = () => {
        board = document.getElementById('board');
        board.height = blockSize * rows;
        board.width = blockSize * cols;
        context = board.getContext('2d'); // for drawing

        randomStart();
        placeFood();
        
        document.addEventListener('keyup', changeDirection);

        // update();
        setInterval(update, 1000/10);
  }
 //create canvas 
  function update() {
  context.fillStyle = 'Black'; //should be first
  context.fillRect(0, 0, board.width, board.height); //gets 0 pos and goes down right 

    context.fillStyle = 'Green';
    // snakeX += velX*blockSize;
    // snakeY += velY*blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize); //draws the snake with xy pos and block default size

    context.fillStyle = 'Pink';
    context.fillRect(foodX, foodY, blockSize, blockSize); //draws the food with xyl
}

// function changeDirection(e) {
//     if (e.code == "ArrowUp") { //up
//         velX = 0;
//         velY = -1;
//     }
//      if (e.code = "ArrowDown") { //donw
//         velX = 0;
//         velY = 1
//     }
//      else if (e.keyCode == '37') { //left
//         velX = -1;
//         velY = 0;
//     }
//     else if (e.keyCode == '39') { //right
//         velX = 1;
//         velY = 0;
//     }
// }

function randomStart() {
    snakeX = Math.floor(Math.random() * cols)*blockSize;
    snakeY = Math.floor(Math.random() * rows)*blockSize;
}
function placeFood() {
    foodX = Math.floor(Math.random() * cols)*blockSize;
    foodY = Math.floor(Math.random() * rows)*blockSize;
}
});