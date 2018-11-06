// Business logic for PC movement\ Example
function MultipleFallingObjects() {
  this.fallingObjects = [],
  this.currentId = 0,
  this.addFallingObject = function(fallingObject) {
    fallingObject.id = this.assignId();
    this.fallingObjects.push(fallingObject);
  },

  this.assignId = function() {
    this.currentId += 1;
    return this.currentId;
  },

  this.findFallingObject = function(id) {
    for (var i=0; i< this.fallingObjects.length; i++) {
      if (this.fallingObjects[i]) {
        if (this.fallingObjects[i].id == id) {
          return this.fallingObjects[i];
        }
      }
    };
    return false;
  }

  this.pauseAll = function() {
    for (var i=0; i < this.fallingObjects.length; i++ ){
      var object = this.fallingObjects[i];
      object.pauseFall();
    }
  }

  this.playAll = function() {
    for (var i=0; i < this.fallingObjects.length; i++ ){
      var object = this.fallingObjects[i];
      object.playFall();
    }
  }
}


MultipleFallingObjects.prototype.CreateFallingObjects = function() {
  for (var i=0; i < 15; i++ ){

    //Can change the range of initial spawn here. First random represents x-axis, second, the y-axis.
    this.addFallingObject(new FallingObject(randInt(1030, 0), randInt(0, -1200)));
    console.log("Falling object number: " + i);
  }
}



function randInt(max, min) {
   var number = Math.floor(Math.random()*(max - min + 1)) + min;
   return number;
}


var myGamePiece;
var animate;



function PlayerCharacter(width, height, color, x, y, score = 0) {  // object with
  this.gamearea = myGameArea;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.score = score;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = "30px Courier New";
    var scoreColor = ctx.createLinearGradient(0, 0, canvas.width, 0);
    scoreColor.addColorStop("0","#050400");
    ctx.fillStyle = scoreColor;
    ctx.fillText("Score: " + this.score, 10, 30);
  }
  this.newPos = function() {
      this.x += this.speedX;
    // this.y += this.speedY;
  }
  this.pausePlayer = function() {
    this.speedX = 0;
    this.speedY = 0;
  }
}

function FallingObject(x = 0, y = 0) { // Construct for creating falling object. positions variable
  this.x = x;
  this.y = y;
  this.width = 5;
  this.height = 70;
  this.speedX = 0;
  this.speedY = 4.75;

  this.updateFall = function() {  // info for recreating object after screen clear (uses object's updated positions)
    var ice = new Image();
    ice.addEventListener('load', function() {
      // execute drawImage statements here
    }, false);
    ice.src = "img/ice.png";
    ctx = myGameArea.context;
    ctx.drawImage(ice, this.x, this.y)
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

  this.myMove = function() {
  var yAxis = this.y
    if (yAxis <= 750) {
      yAxis += this.speedY;
    } else {
      //Can change range of respawn coordinates here.
      yAxis = randInt(0, -200);
      this.x = randInt(1030, 0);
    }
    this.y = yAxis;
  }

  this.pauseFall = function() {
    this.speedY = 0;
  }
  this.playFall = function() {
    this.speedY = 4.75;
  }
}


var rain;
var myGamePiece;
var paused;


// var animate;

function startGame() {  // makes pc as a PlayerCharacter piece
    myGameArea.start();
    myGamePiece = new PlayerCharacter(30, 50, "#0E6B28", 600, 670);
    rain = new MultipleFallingObjects();
    rain.CreateFallingObjects();
    paused = false;
}

function pauseGame(pc, objectsArray) {
  pc.pausePlayer();
  objectsArray.pauseAll();
}


var myGameArea = { // makes canvas parameters. canvas is an html element that only takes images, and graphic from JavaScript.
    canvas : document.getElementById("canvas"),

    // scoreSpan.setAttribute("id", "score"),
    start : function() {

        this.context = canvas.getContext("2d");

        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 8.34);
        if (paused) {
          window.addEventListener('keydown', function (e) {
              myGameArea.keys = (myGameArea.keys || []);
              myGameArea.keys[e.keyCode] = false;
              myGameArea.keys[80] = true;
          })
          window.addEventListener('keyup', function (e) {
              myGameArea.keys[e.keyCode] = true;
              myGameArea.keys[80] = false;
          })
        } else {

          window.addEventListener('keydown', function (e) {
              myGameArea.keys = (myGameArea.keys || []);
              myGameArea.keys[e.keyCode] = true;
              // myGameArea.keys[39] = true;
              // myGameArea.keys[80] = true;
          })
          window.addEventListener('keyup', function (e) {
              myGameArea.keys[e.keyCode] = false;
              // myGameArea.keys[39] = false;
              // myGameArea.keys[80] = false;
          })
        }
    },
    clear : function(){
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    } // clears the canvas of old versions of objects (like where the pc was one key press ago)
}

var continueAnimating = true;

function updateGameArea() { // draws the new position of the pc after removing ALL objects in canvas.


  if (paused) {
    if (myGameArea.keys && myGameArea.keys[80]) {
      setTimeout(function(){
      paused = false;
      rain.playAll();
    }, 150);
    }
  } else {

    if(!continueAnimating) {
      return;
    }

    myGameArea.clear();
    myGamePiece.speedX = 0;
    // myGamePiece.speedY = 0;

    for (var i=0; i < rain.fallingObjects.length; i++ ){
      var rainDrop = rain.fallingObjects[i];
      if (rainDrop.x < myGamePiece.x + myGamePiece.width &&
        rainDrop.x + rainDrop.width > myGamePiece.x &&
        rainDrop.y < myGamePiece.y + myGamePiece.height &&
        rainDrop.y + rainDrop.height > myGamePiece.y) {
          console.log("hit");
          $("#score").text(myGamePiece.score);
          continueAnimating = false;
        } else {
          $("#score").text(myGamePiece.score += 3);
          rainDrop.myMove();
          rainDrop.updateFall();
        }
    }


    if (myGameArea.keys && myGameArea.keys[37] && myGamePiece.x>8) {  // ensures the game piece is within the limitations of the canvas border, creates an array of the keys that are pressed
      myGamePiece.speedX += -10;
    }

    if (myGameArea.keys && myGameArea.keys[39] && myGamePiece.x<1042) {
      myGamePiece.speedX += 10;
    }

    if (myGameArea.keys && myGameArea.keys[80]) {
      setTimeout(function(){
      pauseGame(myGamePiece, rain);
      paused = true;
    }, 150);
    }
    myGamePiece.newPos();
    myGamePiece.update();

  }
}

$(document).ready(function() {


});
