var rain;
var myGamePiece;
var paused;
var snowFall;
var refreshRate = setInterval(updateGameArea, 16.67);
var refreshRateStart = setInterval(updateStartArea, 8.34);
var myGamePiece;
var animate;
var iceCount = 15;
var iceSpeed = 4;
var continueAnimating = true;
var playerHighScore = new PlayerHighScore(0);
var stopStartScreen = false;
var audio = new Audio('main.mp3');
var audioUltra = new Audio('stardust.mp3');


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
    this.addFallingObject(new FallingObject(randInt(1080, 0), randInt(0, -1200)));
  }
}

MultipleFallingObjects.prototype.RemoveAllFallingObjects = function() {
  this.fallingObjects.splice(0, this.fallingObject.length);
  this.currentId = 0;
}

MultipleFallingObjects.prototype.CreateSnowFall = function(iceCount) {
  for (var i=0; i < iceCount; i++ ){

    //Can change the range of initial spawn here. First random represents x-axis, second, the y-axis.
    this.addFallingObject(new FallingObject(randInt(1080, 0), randInt(0, -1200), randInt(40, 15), randInt(30,15), randInt(1, -1), randInt(3, 5)));
  }
}

function randInt(max, min) {
  var number = Math.floor(Math.random()*(max - min + 1)) + min;
  return number;
}

function PlayerHighScore(score) {
  this.score = score;
}

function PlayerCharacter(width, height, color, x, y, score = 0) {  // object with
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
    this.x = randInt(1080, 0);
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
  myGamePiece = new PlayerCharacter(15, 20, "#FFF", 600, 700);
  rain = new MultipleFallingObjects();
  rain.CreateFallingObjects(10);
  paused = false;
}

function startScreen() {
  continueAnimating = false;
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
    window.addEventListener('keydown', function (e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false;
    })

    this.interval = refreshRateStart;
  },
  clear : function(){
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  } // clears the canvas of old versions of objects (like where the pc was one key press ago)
}

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
    ctx.fillText("< and > to move", canvas.width/2, canvas.height/2 - 25);
    ctx.fillText("press space to start", canvas.width/2, canvas.height/2 + 25);
    if(myGamePiece){
      ctx.fillText("Score That Round: " + myGamePiece.score, canvas.width/2, canvas.height/2 - 240);
    }
    ctx.fillText("High Score: " + playerHighScore.score, canvas.width/2, canvas.height/2 - 300);
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
      })
      window.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = false;
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

    myGameArea.clear();
    myGamePiece.speedX = 0;

    // myGamePiece.speedY = 0;
    for (var i=0; i < rain.fallingObjects.length; i++ ){
      var rainDrop = rain.fallingObjects[i];
      if (rainDrop.x < myGamePiece.x + myGamePiece.width &&
        rainDrop.x + rainDrop.width > myGamePiece.x &&
        rainDrop.y < myGamePiece.y + myGamePiece.height &&
        rainDrop.y + rainDrop.height > myGamePiece.y) { //hit detection

          continueAnimating = false;
          stopStartScreen = false;
          startScreen();
        } else {
          myGamePiece.score += 2;

          if(myGamePiece.score >= playerHighScore.score){
            playerHighScore.score += 2;
            playerHighScore.score = myGamePiece.score;

          }

          rainDrop.myMove();
          rainDrop.updateFall();

          if (myGamePiece.score <= 4) {
            iceSpeed = 6;
            rain.CreateFallingObjects(0);
            audioUltra.pause();
            audio.load();
            audio.play();
            $("body").removeClass("ultra2");
            $("canvas").removeClass();
            $("canvas").addClass("level1");
          }

          if (myGamePiece.score === 35000) {
            rain.CreateFallingObjects(7);
            iceSpeed = 6;
            $("canvas").addClass("level2");
          }

          if (myGamePiece.score === 80000) {
            rain.CreateFallingObjects();
            iceSpeed = 8;
            $("canvas").removeClass("level2");
            $("canvas").addClass("level3");
          }

          if (myGamePiece.score === 100000) {
            rain.CreateFallingObjects(8);
            iceSpeed = 8;
            $("canvas").removeClass("level3");
            $("canvas").addClass("level4");
          }

          if (myGamePiece.score === 150000) {
            rain.CreateFallingObjects(5);
            iceSpeed = 10;
            $("canvas").removeClass("level4");
            $("canvas").addClass("level5");
          }

          if (myGamePiece.score === 250000) {
            rain.CreateFallingObjects(5);
            iceSpeed = 12;
            $("canvas").removeClass("level5");
            $("canvas").addClass("level6");
          }

          if (myGamePiece.score === 400000) {
            rain.CreateFallingObjects(10);
            iceSpeed = 12;
            $("canvas").removeClass("level6");
            $("canvas").addClass("level7");
          }

          if (myGamePiece.score === 500000) {
            rain.CreateFallingObjects(7);
            iceSpeed = 14;
            audio.pause();
            audioUltra.load();
            audioUltra.play();
            $("canvas").removeClass("level7");
            $("canvas").addClass("ultra");
            $("body").addClass("ultra2");
          }
        }
      }

      if (myGameArea.keys && myGameArea.keys[37] && myGamePiece.x>5) {  // ensures the game piece is within the limitations of the canvas border, creates an array of the keys that are pressed
        myGamePiece.speedX += -6.5;
      } // left arrow key

      if (myGameArea.keys && myGameArea.keys[39] && myGamePiece.x<1065) {
        myGamePiece.speedX += 6.5
      } // right arrow key

      if (myGameArea.keys && myGameArea.keys[65] && myGamePiece.x>5) {  // ensures the game piece is within the limitations of the canvas border, creates an array of the keys that are pressed
        myGamePiece.speedX += -3.5;
      } // left arrow key

      if (myGameArea.keys && myGameArea.keys[68] && myGamePiece.x<1065) {
        myGamePiece.speedX += 3.5;
      } // right arrow key

      if (myGameArea.keys && myGameArea.keys[80]) {
        setTimeout(function(){
          pauseGame(myGamePiece, rain);
          paused = true;
        }, 150);
      } // 'P' key
      myGamePiece.newPos();
      myGamePiece.update();

    }
  }

  $(document).ready(function() {
    $("#startGame").click(function() {
      startGame();
      continueAnimating = true;
      stopStartScreen = true;
    });
  });
