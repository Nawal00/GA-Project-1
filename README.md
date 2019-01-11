Project-01-GA
JavaScript Game

WDI-Project1 General Assembly

Project 1 : front-end game

Goal: To create a single page game Timeframe: 7 days

Technologies used
* JavaScript (ES6)
* jQuery
* HTML5 + HTML5 Audio
* CSS + CSS Animation GitHub

My Game - Space Invaders

You can find a hosted version here ---->

Game overview

Space Invaders is a classic arcade game from the 80s. The player can only move right and left and aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.

The aliens also move from left to right, and also down each time the reach the side of the screen. The aliens also periodically drop bombs towards the player.

Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.

Controls

* Spaceship movements: ← →  keys
* Start game: "Start" button
* Play again game: "Play Again" button
* Shoot: "Space" key

Game Instructions

1. The game begins with a start page introducing the aim of the game. The game is started by clicking on the "Start" button.

<img width="1280" alt="screenshot 2019-01-11 at 10 30 06" src="https://user-images.githubusercontent.com/42609274/51028647-f5ccfc00-158b-11e9-8439-b43bab31a6f4.png">

2. Once the game begins, the alien waves appear on the top half of the screen and the spaceship on the bottom of the screen. The Space ship can be controlled by the player using the ←  → keys. The score, level and lives(3) is also displayed on the top of the screen.

<img width="1280" alt="screenshot 2019-01-11 at 10 46 03" src="https://user-images.githubusercontent.com/42609274/51029429-2d3ca800-158e-11e9-9d3e-cd1b61933b21.png">

3. Scores are accumulated when the player hits the aliens with its laser. The shot alien will then explode and disappear from the screen. On the other hand, if the players gets hit by the the aliens then the players lives will decrement and the spaceship will explode.

<img width="1280" alt="screenshot 2019-01-11 at 11 13 40" src="https://user-images.githubusercontent.com/42609274/51030662-08e2ca80-1592-11e9-886e-27e82fca518a.png">

4. If the player clears the wave of aliens, the level will increment and display twice as many aliens and speed up their movements.

<img width="1276" alt="screenshot 2019-01-11 at 11 25 2a7 1" src="https://user-images.githubusercontent.com/42609274/51031338-2749c580-1594-11e9-84fc-7eb3713d126f.png">

5. The game ends when the player runs out of lives or if the aliens reaches the same level as spaceship. Subsequently, the final score and the level is displayed.

<img width="1280" alt="screenshot 2019-01-11 at 11 38 31" src="https://user-images.githubusercontent.com/42609274/51031759-780dee00-1595-11e9-9712-5d7c10a45c53.png">

Process

The main idea of this project was to create a game using basic grid layout so the player
