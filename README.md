# **JavaScript Game**


**Project 1**

**Goal:** To create a single page game

**Timeframe:** 7 days

**Technologies used**
* JavaScript (ES6)
* jQuery
* HTML5 + HTML5 Audio
* CSS + GitHub

**My Game** - Space Invaders

You can find a hosted version here ----> https://nawal00.github.io/Project-01-GA/

# **Game overview**

Space Invaders is a classic arcade game from the 80s. The player can only move right and left and aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.

The aliens also move from left to right, and also down each time the reach the side of the screen. The aliens also periodically drop bombs towards the player.

Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.

# **Controls**

* Spaceship movements: ← →  keys
* Shoot: "Space" key
* Start game: "Press Start" button
* Play again game: "Play Again" button


# **Game Instructions**

**1.** The game begins with a start page introducing the aim of the game. The game is started by clicking on the "Start" button.

<img width="1274" alt="screenshot 2019-01-20 at 14 58 00" src="https://user-images.githubusercontent.com/42609274/51440919-d63c7e80-1cc3-11e9-9ebc-ca8fc2691c0c.png">


**2.** Once the game begins, the alien waves appear on the top half of the screen and the spaceship on the bottom of the screen. The Space ship can be controlled by the player using the ←  → keys. The score, level and lives(3) is also displayed on the top of the screen.

<img width="1280" alt="screenshot 2019-01-11 at 10 46 03" src="https://user-images.githubusercontent.com/42609274/51029429-2d3ca800-158e-11e9-9d3e-cd1b61933b21.png">

**3.** Scores are accumulated when the player hits the aliens with its laser. The shot alien will then explode and disappear from the screen. On the other hand, if the players get hit by the the aliens then the players lives will decrement and the spaceship will explode.

<img width="1280" alt="screenshot 2019-01-11 at 11 13 40" src="https://user-images.githubusercontent.com/42609274/51030662-08e2ca80-1592-11e9-886e-27e82fca518a.png">

**4.** If the player clears the wave of aliens, the level will increment and display twice as many aliens and speed up their movements.

<img width="1276" alt="screenshot 2019-01-11 at 11 25 2a7 1" src="https://user-images.githubusercontent.com/42609274/51031338-2749c580-1594-11e9-84fc-7eb3713d126f.png">

**5.** The game ends when the player runs out of lives or if the aliens reaches the same level as spaceship. Subsequently, their final score and the score board is displayed. The player can also save their score if it is higher than the ones in the score board.

<img width="1277" alt="screenshot 2019-01-20 at 14 51 03" src="https://user-images.githubusercontent.com/42609274/51440838-08011580-1cc3-11e9-836c-d74b4e684408.png">

# **Process**

The main idea of this project was to create a game using basic grid layout so the spaceship is able to move left and right. This was created by a list of  (20 x 20) 'div's in the HTML. Each divs within the grid is an individual element. These divs are nestled within a container. The spaceship, aliens, laser and explosions were created by applying classes to the elements within the grid. When these elements are moved, their class is also removed from the div of their current position and applied to the new div which becomes their new current position.

I created the aliens in an array and displayed them on the grid by adding class aliens to the divs. Their movement patterns are created by moving the index of the aliens array with a for each loop and then passing the aliens indexes on the the div index to display.

To move the player's lasers and alien's bombs I created a function with a set interval to move the index of player's laser upwards and alien bomb class downwards every few milliseconds. Within this function, I incorporated collision detection condition, so that when the players laser hits the alien it initiates the explosive sprite sheet class and removes the alien.

# **Challenges**

There were several timings and aliens direction bugs that I had to deal with. For example, if the last alien died at left edge of the screen would mean that the global variable for next wave of aliens is still left instead of right (default value). As the aliens wave are generated at div index 0 this led to error as the new wave of alines indexes would go - 1, -2, -3 when it should go right 0, 1, 2. I fixed this error by generating the aliens from the centre of the grid on all cases which meant that the new wave of alien could go right or left and when they reach the edge of the grid the aliens would move down a row.

# **Wins**

In this project, I had to work with arrays and various array methods to build the main logic of the game. Timings events were also crucial part of this project as a lot of features depended on it and I managed to used it to create some of the main features that showed movement in the game including explosive sprite sheet animation.

I was particularly pleased with my function that made use of localStorage to keep a record of score board. This gave more meaning to the game as user would try to be on the score board of top 5.

<img width="778" alt="screenshot 2019-01-20 at 20 27 49" src="https://user-images.githubusercontent.com/42609274/51444643-1e729580-1cf2-11e9-9dbd-4511f7bda6e2.png">


# **Future Features**

If I had more time, I would like to add two specific features because it would enhance the user interface. They are screen pop up to notify players when they have leveled up and cascading animations to bring the game alive. I would like also to use Construction/Class function to create unique properties for different aliens. For example, the top row of aliens would have different styling and give away more points than the aliens on the bottom row.

Thanks for reading and hope you enjoy shooting the aliens!
