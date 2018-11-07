MVP:
  - Objects falling with hit detection
  - Object on the ground to control
  - Score system/lives system
  - Start screen

Extra things we want:
  - Pause
  - Options (different theme colors/colorblind mode)
  - Difficulty levels
  - CSS animations
  - Multiple Game Screen Sizes

Wishlist:
  - Sound effects/music
  - Multiple levels or game gets harder as time goes on
  - Multiple players at the same time


Team work (starting out):

    Cole/Miles:
    Falling Objects

    Blake/Michael:
    Controllable objects (PC)


Bugs:
 - function updateGameArea(): second thing that appears if game is not paused


#### _Specifications_

Falling Object Construct:
out construct for how a falling object works.
this object has a variable for:
  - its current x axis (this.x)
  - its current y axis (this.y)
  - its x axis speed, the rate at which its position changes **PER FRAME** (this.speedX)
  - its y axis speed (this.speed.Y)   
  the hit box/rectangle width and height as this.width and this.height respectfully

Update fall prototype for falling method:
  Redraws object onto the screen
  Contains sprite (icicle png)
  Contains a hit box, which is represented by the invisible rectangle drawn on the screen

Create myMove prototype for falling objects:
  Changes y position relative to speed variable
  resets y position if object falls off Screen:
    sets random start point for object between y(0 and -200)
    sets random start point for object between x(0 and 1030)


Player Character Construct:
Construct for the controllable player character
  - this.gameArea is tied to the variable game area
  - this.width sets the width for the player character
  - this.height sets the height for the player character
  - this.speedX sets the x axis speed for the player character to be controlled
  - this.speedY similar to speedX but unused for now
  - this.x sets the current x axis position of the player character and reads where they are on the x axis   
  - this.y sets the current y axis position of the player character and keeps them locked to the "floor" for the y axis because our y speed is always set to 0
  - this.score is the score the player is achieving while in play

  this.prototype.update:
    Draws the score, player character, and High score to the screen.
    the purpose of this method is to update the game area with the new position of the player, the current score, and the high score.

  this.prototype.newPos:
    Updates the position of the player character based off of the net speed. Because we are locked to the x-axis for movement, it is very simple.


MultipleFallingObjects Construct:
  For loop to create falling icicle objects
  Add falling object method to icecount variable to randomize icicle spawn point
