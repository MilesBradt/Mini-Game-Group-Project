// Business logic for PC movement\ Example

var myGamePiece;

function component(width, height, color, x, y) {  // object with
  this.gamearea = myGameArea;
  this.width = width;
  this.height = height;
  this.speedX = 0;
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
    // this.y += this.speedY;
  }
}

function startGame() {  // makes pc as a component piece
    myGameArea.start();
    myGamePiece = new component(30, 50, "red", 510, 650);
}

var myGameArea = { // makes canvas parameters. canvas is an html element that only takes images, and graphic from JavaScript.
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1080;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        });
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } // clears the canvas of old versions of objects (like where the pc was one key press ago)
}

function updateGameArea() { // draws the new position of the pc after removing ALL objects in canvas.
    myGameArea.clear();
    myGamePiece.speedX = 0;
    // myGamePiece.speedY = 0;

    //ensures the game piece is within the limitations of the canvas border
    if (myGameArea.key && myGameArea.key == 37 && myGamePiece.x>8) {
      myGamePiece.speedX = -8;
     }

    if (myGameArea.key && myGameArea.key == 39 && myGamePiece.x<1042) {
      myGamePiece.speedX = 8;
     }
    // if (myGameArea.key && myGameArea.key == 38) {
    //   myGamePiece.speedY = -8;
    //  }
    // if (myGameArea.key && myGameArea.key == 40) {
    //   myGamePiece.speedY = 8;
    //  }
    myGamePiece.newPos();
    myGamePiece.update();
}

$(document).ready(function() {

});
