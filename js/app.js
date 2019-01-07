$(() => {
  const $grid = $('.grid')
  const width = 20
  let playerIndex = 388
  let aliensInRow = 15
  let direction = 'right'
  let changeDirection = false
  let deadAlienIndex
  let alienArray = []

  //------------- create 10 x 10 grid divs ---------------

  for(let i = 0; i < width * width; i++) {
    $grid.append($('<div> </div>'))
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
        console.log(` dead alien index is ${deadAlienIndex}`)
        $divs.eq(shootingIndex).removeClass('aliens')
        handleDeadAlien(shootingIndex)
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

// delete alien from array if
  function handleDeadAlien(shootingIndex){
    alienArray = alienArray.filter(element =>  element !== shootingIndex)
    console.log(alienArray)
  }

  // -------------- add aliens on top row   ------------------------

  //push alien to an array
  function createRow(startIndex){
    for (let i = startIndex; i < aliensInRow; i++) {
      $divs[i].classList.add('aliens')
      alienArray.push(i)
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

  function moveAlien(direction) {
    for (let i=0; i < alienArray.length; i++) {
      if (direction === 'left') {
        alienArray[i] -= 1
      } else if (direction === 'right') {
        alienArray[i] += 1
      } else {                        //don't put set direction to down here
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
    setInterval(function() {
      if(changeDirection){               //starts as false so these if options are skipped
        moveAlien('down')
        if(direction ==='left'){
          direction ='right'
        }else{
          direction ='left'
        }
        changeDirection = false
      }else{
        moveAlien(direction)        //this starts the directions. it is set to 'right' at the top intiially
        checkEdgeOfscreen()                //this check alien boundaries and see whether to change direction
        // endgameWin()
      }
    }, 1000)
  }





  createRow(0)
  createRow(10)
  gameLoop()




  console.log(alienArray)



})
