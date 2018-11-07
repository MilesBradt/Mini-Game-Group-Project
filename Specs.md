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
  An object to house several of our falling objects. There is a way to target individual falling objects, as each one has a unique ID associated with it, along with its position in an array.
  - this.fallingObjects is the array that houses multiple FallingObject objects.
  - this.currentId is helps us assign an ID to each object that we add to our array.

  this.prototype.CreateFallingObjects(iceCount):
    For loop to push some number (iceCount) of objects falling objects into our array, and assign them all an ID.
    This method also includes the necessary notation to give all objects created random starting positions (within a useful range).

  this.prototype.RemoveAllFallingObjects():
    A method to remove all objects from our array, and reset the ID counter.


  the variable 'myGameArea':
    Canvas is an html element that only takes images, and graphics from Javascript
    myGameArea finds the canvas that we've set up in HTML, adds context:
      Takes key commands
      Game piece has own context that will get used in my game area
      Falling objects have own context that will get used in my game area
    Sets up a clear function to empty the canvas of all objects

Function updateGameArea():
  Description: draws the new position of all objects on the canvas after clearing.
  myGameArea.clear method is the aforementioned clear function to clear the canvas.
  The next this checks for a hit; overlapping the hit box of the player character (pc) with a falling object's hit box.

  **If the pc has been hit by a falling object**
  The game stops updating our game area.
  We get sent back to the start screen.
  Our score is pushed to the highScore array.
  Score is reset to 0.

  **If the pc has not been hit by a falling object**
  The score continues to be updated.
  Once the player reaches specified score thresholds, we update the game difficulty.
  We look for key inputs: on a left arrow key hold we adjust the player character's speedX in the negative direction, on a right arrow key hold we adjust the player character's speedX in the positive direction.
  We update the new position based on our key inputs, and then we paint the objects to the canvas.

  **Pause functionality**
  Every construct has a pause state
  While the game is running, the update game area checks if the "P" key has been pressed
  If the "P" key is pressed the game enters a pause state in which all objects on the canvas enter their individual pause states:
    Falling objects no longer maintain speed
    Play character key inputs do not works
    Score does not increase

In HTML our body element performs the **startScreen()** method:
  On load we have the start screen (snowfall) start up to show the user inputs for the game and how to start it
  Performs methods similar to startGame() but without playable character or falling objects (spikes to avoid)
  Checks for spacebar to be pressed to begin running startGame() putting the animation back on and stopping the start screen

  ## Building Process Followed:

  _MVP:_
    - Objects falling with hit detection
    - Object on the ground to control
    - Score system/lives system
    - Start screen

  _Extra things we want:_
    - Pause
    - Options (different theme colors/colorblind mode)
    - Difficulty levels
    - CSS animations
    - Multiple Game Screen Sizes

  _Wishlist:_
    - Sound effects/music
    - Multiple levels or game gets harder as time goes on
    - Multiple players at the same time
