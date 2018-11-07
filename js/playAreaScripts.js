var rain;
var myGamePiece;
var paused;
var snowFall;
var refreshRate = setInterval(updateGameArea, 8.34);
var refreshRateStart = setInterval(updateStartArea, 8.34);
var myGamePiece;
var animate;
var iceCount = 15;
var iceSpeed = 4;
var continueAnimating = true;
var playerHighScore = new PlayerHighScore(0);


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



MultipleFallingObjects.prototype.CreateFallingObjects = function(iceCount) {
  for (var i=0; i < iceCount; i++ ){

    //Can change the range of initial spawn here. First random represents x-axis, second, the y-axis.
    this.addFallingObject(new FallingObject(randInt(1030, 0), randInt(0, -1200)));
    console.log("Falling object number: " + iceCount);
  }
}

MultipleFallingObjects.prototype.RemoveAllFallingObjects = function() {
  this.fallingObjects.splice(0, this.fallingObject.length);
}

MultipleFallingObjects.prototype.CreateSnowFall = function(iceCount) {
  for (var i=0; i < iceCount; i++ ){

    //Can change the range of initial spawn here. First random represents x-axis, second, the y-axis.
    this.addFallingObject(new FallingObject(randInt(1030, 0), randInt(0, -1200), randInt(20, 10), randInt(20,10), randInt(1, -1), randInt(3, 5)));
  }
}


function randInt(max, min) {
  var number = Math.floor(Math.random()*(max - min + 1)) + min;
  return number;
}

function PlayerHighScore(score) {
  this.score = score;
}


function PlayerCharacter(width, height, color, x, y, score) {  // object with
  this.gameArea = myGameArea;
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
    scoreColor.addColorStop("0","#FFF");
    ctx.fillStyle = scoreColor;
    ctx.textAlign = "left";
    ctx.fillText("Score: " + this.score, 10, 30);
    ctx.fillText("High Score: " + playerHighScore.score, 10, 60);
    ctx.textAlign = "center";
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

function FallingObject(x = 0, y = 0, width = 5, height = 15, speedX = 0, speedY = 6) { // Construct for creating falling object. positions variable
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedX = speedX;
  this.speedY = speedY;

  this.updateFall = function() {  // info for recreating object after screen clear (uses object's updated positions)
  var ice = new Image();
  ice.addEventListener('load', function() {
    // execute drawImage statements here
  }, false);
  ice.src = "img/ice-test.png";
  ctx = myGameArea.context;
  ctx.drawImage(ice, this.x - 4, this.y - 68)
  ctx.fillStyle = "rgba(255,0,0,0)";
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

this.updateSnow = function() {
  ctx = myStartArea.context;
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

this.gentleMove = function() {
  if (this.y <= 800) {
    this.y += this.speedY;
  } else {
    //Can change range of respawn coordinates here.
    this.y = randInt(0, -200);
    this.x = randInt(1080, 0);
  }
  this.x += this.speedX;
}

this.myMove = function() {
  var yAxis = this.y
  if (yAxis <= 800) {
    yAxis += iceSpeed;
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
  this.speedY = 6;
}
}

function startGame() {  // makes pc as a PlayerCharacter piece
  myGameArea.start();
  myGamePiece = new PlayerCharacter(15, 20, "#FFF", 600, 700, 0);
  rain = new MultipleFallingObjects();

  rain.CreateFallingObjects(15);
  paused = false;

}

function startScreen() {
  myStartArea.start();
  myGamePiece;
  snowFall = new MultipleFallingObjects();
  snowFall.CreateSnowFall(20);
}

function pauseGame(pc, objectsArray) {
  pc.pausePlayer();
  objectsArray.pauseAll();
}

var myStartArea = {
  canvas : document.getElementById("canvas"),

  // scoreSpan.setAttribute("id", "score"),
  start : function() {
    this.context = canvas.getContext("2d");
    ctx = this.context
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "teal";
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

    this.interval = refreshRateStart;
  },
  clear : function(){
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  } // clears the canvas of old versions of objects (like where the pc was one key press ago)
}

var stopStartScreen = false;

function updateStartArea() {

  if(stopStartScreen) {
    return;
  } else { // draws the new position of the pc after removing ALL objects in canvas.
    myStartArea.clear();


    if (myGameArea.keys && myGameArea.keys[32]) {
      startGame();
      continueAnimating = true;
      stopStartScreen = true;
    }
    for (var i=0; i < snowFall.fallingObjects.length; i++ ){
      var snowFlake = snowFall.fallingObjects[i];
      snowFlake.gentleMove();
      snowFlake.updateSnow();
    }
    ctx.font = "48px Arial";
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillText("High Score: " + playerHighScore.score, canvas.width/2, canvas.height/2 - 300);
    ctx.fillText("< and > to move", canvas.width/2, canvas.height/2 - 25);
    ctx.fillText("press space to start", canvas.width/2, canvas.height/2 + 25);
  }
}



var myGameArea = { // makes canvas parameters. canvas is an html element that only takes images, and graphic from JavaScript.
  canvas : document.getElementById("canvas"),

  // scoreSpan.setAttribute("id", "score"),
  start : function() {

    this.context = canvas.getContext("2d");
    ctx = this.context

    // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = refreshRate;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

  } // clears the canvas of old versions of objects (like where the pc was one key press ago)
}



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
    // speedX undefined while on start screen
    myGameArea.clear();
    myGamePiece.speedX = 0;
    // myGamePiece.speedY = 0;
    for (var i=0; i < rain.fallingObjects.length; i++ ){
      var rainDrop = rain.fallingObjects[i];
      if (rainDrop.x < myGamePiece.x + myGamePiece.width &&
        rainDrop.x + rainDrop.width > myGamePiece.x &&
        rainDrop.y < myGamePiece.y + myGamePiece.height &&
        rainDrop.y + rainDrop.height > myGamePiece.y) {
          $("#score").text(myGamePiece.score);
          continueAnimating = false;
          stopStartScreen = false;


          startScreen();
        } else {
          $("#score").text(myGamePiece.score += 1);

          if(myGamePiece.score >= playerHighScore.score){
            playerHighScore.score = myGamePiece.score;
            playerHighScore.score += 1;
            $("#highScore").text(playerHighScore.score);
          }


          rainDrop.myMove();
          rainDrop.updateFall();




          if (myGamePiece.score <= 2) {
            iceSpeed = 4;
            rain.CreateFallingObjects(0);
            $("canvas").removeClass();
            $("canvas").addClass("level1");

          }

          if (myGamePiece.score === 5000) {
            rain.CreateFallingObjects(5);
            iceSpeed = 6;
            $("canvas").addClass("level2");
          }

          if (myGamePiece.score === 65000) {
            rain.CreateFallingObjects(10);
            iceSpeed = 8;
            $("canvas").removeClass("level-up2");
            $("canvas").addClass("level-up3");
          }

          if (myGamePiece.score === 100000) {
            rain.CreateFallingObjects(15);
            iceSpeed = 8;
            $("canvas").removeClass("level-up3");
            $("canvas").addClass("ultra");
          }
        }
      }


      if (myGameArea.keys && myGameArea.keys[37] && myGamePiece.x>8) {  // ensures the game piece is within the limitations of the canvas border, creates an array of the keys that are pressed
        myGamePiece.speedX += -3.5;
      }

      if (myGameArea.keys && myGameArea.keys[39] && myGamePiece.x<1042) {
        myGamePiece.speedX += 3.5;
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
    // $("#startScreen").click(function() {
    //   startScreen();
    // });

    $("#startGame").click(function() {
      startGame();
      continueAnimating = true;
      stopStartScreen = true;
    });

  });
