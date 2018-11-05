// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;


// RNG
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}


// Look into replacing this with other shapes
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2);
  ctx.fill();
}

Ball.prototype.update = function() {
  // When object reaches bottom of the screen, spawn at new random loaction
  if ((this.y + this.size) >= height) {
    this.y = 0;
    this.x = random(0, width)
  }
  this.y += this.velY;
}


// Hit detection, needs to be looked at more
// Ball.prototype.collisionDetect = function() {
//   for (var j = 0; j < balls.length; j++) {
//     if (!(this === balls[j])) {
//       var dx = this.x - balls[j].x;
//       var dy = this.y - balls[j].y;
//       var distance = Math.sqrt(dx * dx + dy * dy);
//
//       if (distance < this.size + balls[j].size) {
//         balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
//       }
//     }
//   }
// }

var balls = [];
var testBall = new Ball(50, 100, 4, 4, 'blue');

testBall.x
testBall.size
testBall.color
testBall.draw()

function loop() {
  ctx.fillStyle = 'rgba(10, 10, 10, 0.7)';
  ctx.fillRect(0, 0, width, height);

  // Determines the amount of objects spawned on screen
  while (balls.length <= 15) {
    var size = (25);
    var ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      (0),
      // Fall rate
      (10),
      // RGB color value
      'rgb(' + (176) + ',' + (198) + ',' + (217) +')',
      size
    );
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }

  requestAnimationFrame(loop);
}

loop();
