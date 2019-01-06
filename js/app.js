$(() => {
  const $grid = $('.grid')
  let playerIndex = 95

  //------------- create 10 x 10 grid divs ---------------

  for(let i = 0; i < 100; i++) {
    $grid.append($('<div>' + i + '</div>'))
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
      case 37: if(playerIndex % 10 > 0)
        playerIndex--
        break
        // move player right 39
      case 39: if(playerIndex % 10 < 9)
        playerIndex++
        break
        // fire at space bar
      case 32:
        console.log('FIRED at ' + playerIndex)
        moveMissile(playerIndex, -10)
    }
    movePlayer()
  })

  // -------- draw Missile function ----------

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
        $divs.eq(shootingIndex).removeClass('aliens')
      }
      // if the missile is at top
      if (shootingIndex<0 || shootingIndex>100){
        // stop missile interval
        clearInterval(missileInterval)
        // remove missile 
        $divs.eq(shootingIndex).removeClass('missile')
      }
    }, 100)
  }

  // -------------- add aliens on top row   ------------------------

  // adds 8 aliens to the top row
  function stepAliens(offset, startValue) {
    // offset is initially 0 and then icrements in 10s,
    for(let i = 0; i <= 9; i++){
      // remove aliens on index 0 & 1 then remove aliens on index 9 & 8
      if (i < startValue || i > startValue + 7) {
        $divs.eq(i + offset).removeClass('aliens')
      } else {
        $divs.eq(i + offset).addClass('aliens')
      }
    }
  }

  // remove previous row of aliens
  function removeAliens(offset) {
    for(let i = 0; i <=9; i++){
      $divs.eq(i + offset).removeClass('aliens')
    }
    // }
  }

  //-------------- moves aliens on the row to right & left ---------------

  let currentAliensIndex = 0
  // const moveAliens = [0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0]

  const makeRowMoves =((direction) => {
    let startIndexes
    let rowMoveCount = 0
    const rightMoves = [0,1,2]
    const leftMoves = [2,1,0]

    if (direction === 'right') {
      //aliens moves to right edge
      startIndexes = rightMoves
    }

    if (direction === 'left') {
      //aliens moves to left edge
      startIndexes = leftMoves
    }

    stepAliens(currentAliensIndex, startIndexes[rowMoveCount])
    rowMoveCount ++

//------------------ move aliens down a row ------------------

    const interval = setInterval(() => {
      if (rowMoveCount === 3) {
        //move down a row
        currentAliensIndex = currentAliensIndex + 10

        if (direction === 'right') {
          makeRowMoves('left')
          //remove aliens on the row above
          removeAliens(currentAliensIndex -10)
        }

        if(direction === 'left') {
          makeRowMoves('right')
          removeAliens(currentAliensIndex -10)
        }
        clearInterval(interval)
        return
      }
      stepAliens(currentAliensIndex, startIndexes[rowMoveCount])
      rowMoveCount ++
    }, 1000)
  })

  makeRowMoves('right')


  // const aliensGoDown = setInterval(() => {
  //   stepAliens(currentAliensIndex, moveAliens[startValue])
  //   startValue ++
  //   if ((startValue) % 3 === 0) {
  //     currentAliensIndex = currentAliensIndex + 10
  //     //step add aliens curr index - 20
  //   }
  // }, 1000)
  //
  // aliensGoDown()
})
