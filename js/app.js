$(() => {
  const $grid = $('.grid')
  const $playerScore = $('.playerScore')
  const $winOrLoss = $('.winOrLoss')
  const $level = $('.levels')
  const $startScreen = $('.startScreen')
  const $h1 = $startScreen.find('h1')
  const $playBtn = $('.playBtn')
  const $resetBtn = $('.resetBtn')
  const $lives = $('.lives')
  const width = 20
  const aliensInRow = 10
  let playerIndex = 388
  let direction = 'right'
  let changeDirection = false
  let alienArray = []
  let alienMovingTimer
  let score = 0
  let level = 1
  let alienMovement = 500
  let deadAlienIndex
  let livesLeft = 3
  let alienShotIndex
  let $divs

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

  //change directions right left & down
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

  // game loop to move aliens, check EdgeOfscreen, win and lose condition, alien shooting
  function gameLoop() {
    hideScreen()
    createRow(5)
    createRow(25)
    createRow(45)
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
        moveAlienMissile(alienShotIndex, +width)
        checkLoseGame()
        checkWinGame()
      }
    }, alienMovement)
  }

  function newGame(){
    $level.text(level)
    createRow(5)
    createRow(25)
    createRow(45)
    createRow(65)
    createRow(85)
    checkLoseGame()
    checkWinGame()
    gameLoop()
    alienMovement -= 100
  }

  // win game condition
  function checkWinGame() {
    if(alienArray.length === 0){
      $winOrLoss.text('Cleared Level')
      level++
      clearInterval(alienMovingTimer)
      // if alien wave is cleared start new game
      newGame()
    }
  }

  //check lose condition
  function checkLoseGame(){
    // if(level <=5)alienMovement -= 50
    if (livesLeft === 0){
      $winOrLoss.text('Game Over')
      clearInterval(alienMovingTimer)
      stop()
    }  else{
      //if alien arr is on the last row,
      alienArray.forEach((elem) => {
        if(elem >= width*width - width){
          // user lose
          clearInterval(alienMovingTimer)
          $winOrLoss.text('You Lose')
        }
      })
    }
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
  }

  function stop(){
    clearInterval(alienMovingTimer)
    $startScreen.css('display', 'flex')
    $playBtn.hide()
    $h1.text(`Game Over, You Scored ${score}`)
    $playerScore.text(score)
    $lives.text(livesLeft)
    $level.text(level)
  }

  function reset(){
    score = 0
    livesLeft = 3
    level = 1
    alienArray =[]
    $playerScore.text(score)
    $lives.text(livesLeft)
    $level.text(level)
    gameLoop()
  }

  $resetBtn.on('click', reset)

  // hide start screen function
  function hideScreen(){
    $startScreen.css('display','none')
  }

  // when play button is clicked run gameLoop func
  $playBtn.on('click', gameLoop)

  //initialise game
  function init(){

    for(let i = 0; i < width * width; i++) {
      $grid.append($('<div>', '</div>'))
    }
    $divs = $('.grid div')
    $divs.eq(playerIndex).addClass('player')
  }

  init()

})





// function delayFire() {
//   const random = Math.random()
//   if (random < 0.5)
// }
