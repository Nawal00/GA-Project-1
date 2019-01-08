$(() => {
  const $grid = $('.grid')
  const $playerScore = $('.playerScore')
  const $winOrLoss = $('.winOrLoss')
  const $level = $('.levels')
  const $startScreen = $('.startScreen')
  const $playBtn = $('.playBtn')
  const $lives = $('.lives')
  const width = 20
  const aliensInRow = 10
  let playerIndex = 388
  let direction = 'right'
  let changeDirection = false
  let alienArray = []
  let alienMovingTimer
  let gameOver = false
  let score = 0
  let level = 1
  let delay = 500
  let deadAlienIndex
  let livesLeft = 3

  //------------- create 10 x 10 grid divs ---------------
  for(let i = 0; i < width * width; i++) {
    $grid.append($('<div>', '</div>'))
  }

  //---------- place the player at the bottom of the grid --------
  const $divs = $('.grid div')
  $divs.eq(playerIndex).addClass('player')

  // --------- function to move player -----------
  function movePlayer() {
    $divs.eq(playerIndex).addClass('player')
  }

  // ------------- Handle plapyer events ----------------
  $(document).on('keydown', e => {

    $divs.eq(playerIndex).removeClass('player')
    //move player left 37
    switch(e.keyCode) {
      case 37: if(playerIndex % width  > 0)
        playerIndex--
        break
        // move player right 39
      case 39: if(playerIndex <($divs.length-1))
        playerIndex++
        break
        // fire on space bar press
      case 32:
        moveMissile(playerIndex, -width )
    }
    movePlayer()
  })

  // -------- move Missile function ----------

  function moveMissile(playerIndex, missileIndex){
    //starting position of shooting index is same as player
    let shootingIndex = playerIndex

    const missleInt = setInterval(() => {
      // The missile on row above
      $divs.eq(shootingIndex + missileIndex).addClass('missile')
      // remove its current position
      $divs.eq(shootingIndex).removeClass('missile')
      // current position is reassigned to new position
      shootingIndex += missileIndex
      // when the missile hits the alien remove the aliens
      if($divs.eq(shootingIndex).hasClass('aliens')){
        deadAlienIndex = shootingIndex
        console.log(deadAlienIndex)

        //increment score by 20 if user hits an alien
        updateScore()
        //remove aliens from div/grid hit my missle
        $divs.eq(shootingIndex).removeClass('aliens')
        $divs.eq(shootingIndex).removeClass('missile')
        //remove aliens from array hit my missle
        handleDeadAlien(deadAlienIndex)
        clearInterval(missleInt)
      }
      // if the missile is at top
      if (shootingIndex<0 || shootingIndex>400){
        // stop missile interval
        clearInterval(missleInt)
        // remove missiles
        $divs.eq(shootingIndex).removeClass('missile')
      }
    }, 100)
  }

  let alienShotIndex

  function moveAlienMissile(alienIndex, alienBombIndex){

    const rng = Math.floor((Math.random() * (alienArray.length-1)))
    alienShotIndex =  alienArray[rng]

    const alienMissileInterval = setInterval(() => {
      // The missile on row above
      $divs.eq(alienIndex + alienBombIndex).addClass('alienBomb')
      // remove its current position
      $divs.eq(alienIndex).removeClass('alienBomb')
      // current position is reassigned to new position
      alienIndex += alienBombIndex
      // when the missile hits the alien remove the aliens
      if($divs.eq(alienIndex).hasClass('player')){
        //decrease player lives if the alien hits the player
        playerLives()
      }
      // if the missile is
      if ( alienBombIndex > width*width){
        // stop missile interval
        clearInterval(alienMissileInterval)
        // remove missile
        $divs.eq(alienIndex).removeClass('alienBomb')
      }
    }, 100)
  }

  // filter as in delete aliens index with shootingIndex
  function handleDeadAlien(deadAlienIndex){
    alienArray = alienArray.filter(element =>  element !== deadAlienIndex)
    console.log(alienArray)
  }

  // -------------- add aliens on top row   ------------------------

  //push alien to an array
  function createRow(startIndex){
    for (let i = 0; i < aliensInRow; i++) {
      $divs[startIndex].classList.add('aliens')
      alienArray.push(startIndex)
      startIndex ++
    }
  }

  //show Alien
  function showAliensMoving(){
    $divs.each(index => {
      if($divs[index].classList.value === 'aliens'){
        //remove alien
        $divs[index].classList.remove('aliens')
      }
    })
    alienArray.forEach(index => {
      $divs[index].classList.add('aliens')
    })
  }

  function alienDirection(direction) {
    for (let i=0; i < alienArray.length; i++) {
      if (direction === 'left') {
        alienArray[i] -= 1
      } else if (direction === 'right') {
        alienArray[i] += 1
      } else {
        alienArray[i] += width
      }
    }
    showAliensMoving()
  }

  // ----- check if the alien is at the edge of the screen ---------
  function checkEdgeOfscreen(){
    alienArray.forEach((elem)=>{
      if((elem+1)%width === 0){
        changeDirection = true
      }if (elem%width === 0) {
        changeDirection = true
        direction = 'left'
      }
    })
  }

  // game loop to move aliens, check EdgeOfscreen, win and lose condition
  function gameLoop() {
    hideScreen()
    createRow(0)
    createRow(20)
    alienMovingTimer = setInterval(function() {
      if(changeDirection){               //starts as false so these if options are skipped
        alienDirection('down')
        if(direction ==='left'){
          direction ='right'
        }else{
          direction ='left'
        }
        changeDirection = false
      }else{
        alienDirection(direction)
        checkEdgeOfscreen()
        checkLoseGame()
        checkWinGame()
        moveAlienMissile(alienShotIndex, +width)
      }
    }, delay)
  }

  // check win function
  function checkWinGame(){
    //if arr is empty you win
    if(alienArray.length === 0){
      $winOrLoss.text('You Won')
      level++
      endGame()
      // newGame()
    }
  }

  function checkLoseGame(){
    //if alien arr is on the last row,
    alienArray.forEach((elem) => {
      if(elem >= width*width - width){
        // user lose
        endGame()
        $winOrLoss.text('You Lose')
      }
    })
  }

  // update score
  function updateScore() {
    score += 20
    $playerScore.text(score)
  }
  // update score
  function playerLives() {
    livesLeft --
    $lives.text(livesLeft)
    endGame()
  }

  // end game func to stop alien moving
  function endGame(){
    if(livesLeft === 0){
      $winOrLoss.text('Game Over')
      clearInterval(alienMovingTimer)
    }
  }

  //new game for new level
  function newGame(){
    $level.text(level)
    createRow(0)
    createRow(20)
    createRow(40)
    createRow(60)
    createRow(80)
    gameLoop()
    checkLoseGame()
  }

  // hide start screen function
  function hideScreen(){
    $startScreen.css('display','none')
  }

  // when play button is click run gameLoop func
  $playBtn.on('click', gameLoop)

  //initialise game
  // function init(){
  //
  //   // gameLoop()
  //   const $grid = $('.grid')
  //   const $playerScore = $('.playerScore')
  //   const $winOrLoss = $('.winOrLoss')
  //   let playerIndex = 388
  // }
  //
  // init()

  //-------------- alien shot -------------




  // function delayFire() {
  //   const random = Math.random()
  //   if (random < 0.5)
  // }



})
