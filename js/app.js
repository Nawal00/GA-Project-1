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
  const playerDirAudio = new Audio('./sounds/explosion.wav')
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


  // -------------- display aliens   ------------------------

  //create aliens from given start index
  function createRow(startIndex){
    for (let i = 0; i < aliensInRow; i++) {
      $divs[startIndex].classList.add('aliens')
      // & push aliens into an array
      alienArray.push(startIndex)
      startIndex ++
    }
  }

  //move aliens
  function showAliensMoving(){
    //loop through the divs
    $divs.each(index => {
      // find divs with aliens class
      if($divs[index].classList.value === 'aliens'){
        // & remove alien from the index
        $divs[index].classList.remove('aliens')
      }
    })
    //loop through the alienArray
    alienArray.forEach(index => {
      //add aliens from array to the divs
      $divs[index].classList.add('aliens')
    })
  }

  // ----- check if the alien is at the edge of the screen ---------
  function checkEdgeOfscreen(){
    alienArray.forEach((elem)=>{
      if((elem+1)%width === 0){
        changeDirection = true
      }if (elem%width === 0) {
        changeDirection = true
      }
    })
  }

  //change directions right left & down inside array
  function alienDirection(direction) {
    for (let i=0; i < alienArray.length; i++) {
      if (direction === 'left') {
        alienArray[i] --
      } else if (direction === 'right') {
        alienArray[i] ++
      } else {
        alienArray[i] += width
      }
    }
    //& call aliens moving func to update the divs index classes
    showAliensMoving()
    moveAlienMissile(alienShotIndex, width)
  }

  // -------- move Missile function ----------

  function moveMissile(shootingIndex, missileIndex){
    //initial position of shooting index is same as playerIndex

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
        $divs.eq(shootingIndex).removeClass('missile')
        alienDieAudio.play()
        //remove aliens from array when hit by missle
        handleDeadAlien(shootingIndex)
        clearInterval(missleInt)
        //add explosives
        explosive(shootingIndex)
        //increment score by 20 if user hits an alien
        updateScore()
      }
      // if the missile goes over top of the grid or if alien arr is empty
      if (shootingIndex<0 || alienArray.length === 0){
        // stop missile interval
        clearInterval(missleInt)
        // remove missiles
        $divs.eq(shootingIndex).removeClass('missile')
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
    const rng = Math.floor((Math.random() * (alienArray.length)))
    // alien shot index is random alien index from the arr
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
        explosive(alienIndex)
        playerDirAudio.play()
      }
      // if the missile is
      if ( alienBombIndex > width*width || alienArray.length === 0){
        // stop missile interval
        clearInterval(alienMissileInterval)
        // remove missile
        $divs.eq(alienIndex).removeClass('alienBomb')
      }
    }, 50)
  }

  // start game to move aliens, check EdgeOfscreen, win and lose condition, alien shooting
  function startGame() {
    displayImagesLives()
    hideScreen()
    createRow(5)
    createRow(25)
    createRow(45)
    alienMovingTimer = setInterval(function() {
      if(changeDirection){
        //starts as false so these if options are skipped
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
      }
    }, alienMovement)
  }


  //create more aliens and speed up on level Up
  function levelUp(){
    if(level === 2  ){
      createRow(65)
      createRow(85)
    } else {
      createRow(65)
      createRow(85)
      createRow(105)
    }
    // $levelScreen.hide()
    startGame()
    alienMovement -= 150
  }

  // win game condition
  function checkWinGame() {
    // if alien wave is cleared level up
    if(alienArray.length === 0){
      level++
      $level.text(level)
      livesLeft = 3
      // $levelScreen
      //   .css('display','flex')
      //   .text(`Level ${level}`)
      clearInterval(alienMovingTimer)
      levelUp()
    }
  }

  //check lose condition
  function checkLoseGame(){
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

  // update lives
  function playerLives() {
    livesLeft --
    displayImagesLives()
  }

  //display spaceship images as lives
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
    $playBtn.hide()
    $resetBtn.show()
    $h1.text('Game Over')
    $p.text(`You died at level ${level}`)
    $p2.text(`Your score is ${score} `)
  }

  // reset button
  function reset(){
    score = 0
    level = 1
    livesLeft = 3
    alienArray =[]
    alienMovement = 500
    $playerScore.text(score)
    $lives.text(livesLeft)
    $level.text(level)
    $divs.removeClass('aliens')
    clearInterval(alienMovingTimer)
    startGame()
  }

  // hide start screen function
  function hideScreen(){
    $startScreen.css('display','none')
  }

  // when play button is clicked run startGame func
  $playBtn.on('click', startGame)

  //reset game
  $resetBtn.on('click', reset)

  // function to call spritesheet
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
