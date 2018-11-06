// Crafty.init(750, 750);
//
// var dim1 = {x: 5, y: 5, w: 50, h: 50}
// var dim2 = {x: 100, y: 100, w: 60, h: 40}
//
// var rect1 = Crafty.e("2D, Canvas, Color").attr(dim1).color("red");
//
// var rect2 = Crafty.e("2D, Canvas, Color, Keyboard, Fourway").fourway(2).attr(dim2).color("blue");
//
// rect2.bind("EnterFrame", function () {
//     if (rect1.x < rect2.x + rect2.w &&
//         rect1.x + rect1.w > rect2.x &&
//         rect1.y < rect2.y + rect2.h &&
//         rect1.h + rect1.y > rect2.y) {
//         // collision detected!
//         alert("Hit");
//         dim2 = {x: 100, y: 100}
//     } else {
//         // no collision
//         this.color("blue");
//     }
// });

// Crafty.init(200, 200);
//
// var dim1 = {x: 5, y: 5}
// var dim2 = {x: 20, y: 20}
//
// Crafty.c("Circle", {
//    circle: function(radius, color) {
//         this.radius = radius;
//         this.w = this.h = radius * 2;
//         this.color = color || "#000000";
//
//         this.bind("Move", Crafty.DrawManager.drawAll)
//         return this;
//    },
//
//    draw: function() {
//        var ctx = Crafty.canvas.context;
//        ctx.save();
//        ctx.fillStyle = this.color;
//        ctx.beginPath();
//        ctx.arc(
//            this.x + this.radius,
//            this.y + this.radius,
//            this.radius,
//            0,
//            Math.PI * 2
//        );
//        ctx.closePath();
//        ctx.fill();
//        ctx.restore();
//     }
// });
//
// var circle1 = Crafty.e("2D, Canvas, Circle").attr(dim1).circle(15, "red");
//
// var circle2 = Crafty.e("2D, Canvas, Circle, Fourway").fourway(2).attr(dim2).circle(20, "blue");
//
// circle2.bind("EnterFrame", function () {
//     var dx = (circle1.x + circle1.radius) - (circle2.x + circle2.radius);
//     var dy = (circle1.y + circle1.radius) - (circle2.y + circle2.radius);
//     var distance = Math.sqrt(dx * dx + dy * dy);
//
//     if (distance < circle1.radius + circle2.radius) {
//         // collision detected!
//         this.color = "green";
//     } else {
//         // no collision
//         this.color = "blue";
//     }
// });

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function myMove() {
  // var qt = 5;

  // for (var i = 0; i < qt; ++i) {
  // };

  var animation = $('<div id="animate"></div>');
  $('#container').prepend(animation);
  var elem = document.getElementById("animate");
  var pos = 0;
  var randomXPos = (random(0, 670));
  elem.style.left = randomXPos + 'px';

  var id = setInterval(frame, 16.67);
  function frame() {
    if (pos >= 670) {
      randomXPos = (random(0, 670))
      pos = 0;
      elem.style.top = pos + 'px';
      elem.style.left = randomXPos + 'px';
    } else {
      pos += 5;
      elem.style.top = pos + 'px';
    }
  }
}
