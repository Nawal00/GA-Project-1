$(() => {
  const $grid = $('.grid')
  const $playerScore = $('.playerScore')
  const $winOrLoss = $('.winOrLoss')
  const $level = $('.levels')
  const $startScreen = $('.startScreen')
  const $h1 = $startScreen.find('h1')
  const $p = $startScreen.find('p')
  const $p2 = $('.scoreDisplay')
  const $playBtn = $('.playBtn')
  const $resetBtn = $('.resetBtn')
  const $lives = $('.lives')
  const width = 20
  const aliensInRow = 10
  const audio = new Audio('./sounds/shoot.wav')
  const alienDieAudio = new Audio('./sounds/invaderkilled.wav')
  let playerIndex = 388,
    direction = 'right',
    changeDirection = false,
    alienArray = [],
    alienMovingTimer,
    score = 0,
    level = 1,
    alienMovement = 500,
    livesLeft = 3,
    alienShotIndex,
    $divs,
    currentStep = 0

  // ------------- Handle player events & move player ----------------
  $(document).on('keydown', e => {

    // on key down remove player class from the playerIndex
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
        audio.play()
    }
    $divs.eq(playerIndex).addClass('player')
  })


  // -------- move Missile function ----------

  function moveMissile(shootingIndex, missileIndex){
    //starting position of shooting index is same as player

    const missleInt = setInterval(() => {
      // The missile on row above
      $divs.eq(shootingIndex + missileIndex).addClass('missile')
      // remove its current position
      $divs.eq(shootingIndex).removeClass('missile')
      // current position is reassigned to new position
      shootingIndex += missileIndex

      // ------ when the missile hits the alien remove the aliens ---------
      if($divs.eq(shootingIndex).hasClass('aliens')){
        $divs.eq(shootingIndex).removeClass('aliens')
        alienDieAudio.play()
        $divs.eq(shootingIndex).removeClass('missile')
        //remove aliens from array when hit by missle
        handleDeadAlien(shootingIndex)
        clearInterval(missleInt)

        //add explosives
        explosive(shootingIndex)
        // $divs.eq(shootingIndex).removeClass('explosive')

        //increment score by 20 if user hits an alien
        updateScore()

      }
      // if the missile is at top
      if (shootingIndex<0 || alienArray.length === 0){
        // stop missile interval
        $divs.eq(shootingIndex).removeClass('missile')
        clearInterval(missleInt)
        // remove missiles
      }
    }, 60)
  }


  // filter as in delete aliens at shootingIndex
  function handleDeadAlien(shootingIndex){
    alienArray = alienArray.filter(element =>  element !== shootingIndex)
  }


  // --------------- alien shoot -------------------------
  function moveAlienMissile(alienIndex, alienBombIndex){

    // generate random num & use it to pick random alienindex from the array
    const rng = Math.floor((Math.random() * (alienArray.length-1)))
    //
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
      if ( alienBombIndex > width*width || alienArray.length === 0 || alienShotIndex+width === alienIndex){
        // stop missile interval
        clearInterval(alienMissileInterval)
        // remove missile
        $divs.eq(alienIndex).removeClass('alienBomb')
      }
    }, 50)
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

  // start game to move aliens, check EdgeOfscreen, win and lose condition, alien shooting
  function startGame() {
    displayImagesLives()
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

  function levelUp(){
    createRow(65)
    createRow(85)
    startGame()
    alienMovement -= 150
  }

  // win game condition
  function checkWinGame() {
    if(alienArray.length === 0){
      level++
      $level.text(level)
      clearInterval(alienMovingTimer)
      // if alien wave is cleared level up a game
      levelUp()
    }
  }

  //check lose condition
  function checkLoseGame(){
    // if(level <=5)alienMovement -= 50
    if (livesLeft === 0){
      $winOrLoss.text('Game Over')
      clearInterval(alienMovingTimer)
      endGame()
    }  else{
      //if alien arr is on the last row,
      alienArray.forEach((elem) => {
        if(elem >= width*width - width){
          // user lose
          clearInterval(alienMovingTimer)
          endGame()
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
    displayImagesLives()
  }


  function displayImagesLives(){
    $lives.empty()
    for(let i = 0; i< livesLeft; i ++){
      $lives.append($('<img src="images/ships.png" />'))
    }
  }


// -------- end Game ----------
  function endGame(){
    clearInterval(alienMovingTimer)
    $startScreen.css('display', 'flex')
    $startScreen.css('background-image', 'url(./images/backgroundgif.gif)')
    $startScreen.css('color', '#f00')
    $playBtn.hide()
    $resetBtn.show()
    $h1.text('Game Over')
    $h1.css('font-size', '70px')
    $p.text(`You died at level ${level}`)
    $p2.text(`Your score is ${score} `)
  }

  function reset(){
    score = 0
    level = 1
    livesLeft = 3
    alienArray =[]
    alienMovement = 500
    $playerScore.text(score)
    $lives.text(livesLeft)
    $level.text(level)
    clearInterval(alienMovingTimer)
    startGame()
  }

  // hide start screen function
  function hideScreen(){
    $startScreen.css('display','none')
  }

  //reset game
  $resetBtn.on('click', reset)

  // when play button is clicked run startGame func
  $playBtn.on('click', startGame)


  function explosive(shootingIndex) {

    if(currentStep === 15){
      currentStep = 0
      $divs.eq(shootingIndex).removeClass('explosive')
      $divs.eq(shootingIndex).removeAttr('data-step', currentStep)

    } else{
      currentStep = currentStep + 1

      $divs.eq(shootingIndex)
        .addClass('explosive')
        .attr('data-step', currentStep)

      setTimeout(()=>explosive(shootingIndex), 13)
    }
  }

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
