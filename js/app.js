$(() => {
  const $grid = $('.grid')
  const width = 20
  const $playerScore = $('.playerScore')
  let playerIndex = 388
  const aliensInRow = 10
  let direction = 'right'
  let changeDirection = false
  let deadAlienIndex
  let alienArray = []
  let alienMovingTimer
  let gameOver = false
  let score = 0
  const $winOrLoss = $('.winOrLoss')

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

    let shootingIndex = playerIndex

    const missileInterval = setInterval(() => {
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
        clearInterval(missileInterval)
      }
      // if the missile is at top
      if (shootingIndex<0 || shootingIndex>400){
        // stop missile interval
        clearInterval(missileInterval)
        // remove missile
        $divs.eq(shootingIndex).removeClass('missile')
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

  //move aliens inside the array
  function moveAliens(){
    let previousIndex

    for (let i = 0; i < alienArray.length; i++) {
      previousIndex = alienArray[i]
      alienArray[i] += 1
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
  // starts the aliens moving and should be refered back to to change direction
  function gameLoop() {
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
      }
    }, 500)
  }

  function checkWinGame(){
    //if arr is empty you win
    if(alienArray.length === 0){
      $winOrLoss.text('You Won')
    }
  }

  function checkLoseGame(){
    //if alien arr is on the last row,
    alienArray.forEach((elem) => {
      if(elem > width*width - width){
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

// engd game func to stop alien moving
  function endGame(){
    clearInterval(alienMovingTimer)
  }

  createRow(0)
  createRow(20)
  createRow(40)

  gameLoop()

  console.log(alienArray)

})
