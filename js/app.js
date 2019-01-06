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
      // The shot is placed on the row above its current position...
      $divs.eq(shootingIndex + missileIndex).addClass('missile')
      // ...removed from its current position...
      $divs.eq(shootingIndex).removeClass('missile')
      // ...and current position is reassigned to new position
      shootingIndex += missileIndex

      if($divs.eq(shootingIndex).hasClass('aliens')){
        console.log('HIT')
        $divs.eq(shootingIndex).removeClass('aliens')
      }
      // When the shot has reached the top of the screen...
      if (shootingIndex<0 || shootingIndex>100){
        // ...the movement timer stops...
        clearInterval(missileInterval)
        // ...and the shot is removed from the gameboard
        $divs.eq(shootingIndex).removeClass('missile')
      }
    }, 100)
  }

  // -------------- create aliens on top ------------------------

  // adds 8 aliens to the top row
  function stepAliens(offset, startValue) {
    // offset is initially 0 and then icrements in 10s,
    for(let i = 0; i <= 9; i++){
      // remove aliens on 0 & 1 then remove aliens on 9 & 8
      if (i < startValue || i > startValue + 7) {
        $divs.eq(i + offset).removeClass('aliens')
      } else {
        $divs.eq(i + offset).addClass('aliens')
      }
    }
  }

  // remove aliens function from previous row
  function removeAliens(offset) {
    for(let i = 0; i <=9; i++){
      $divs.eq(i + offset).removeClass('aliens')
    }
  }

stepAliens(currentAliensIndex, startIndexes[rowMoveCount])
  //-------------- moves aliens on the row to right & left ---------------

  let currentAliensIndex = 0
  let rowMoveCount = 0
  let startIndexes
  // const moveAliens = [0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0]




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
