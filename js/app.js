$(() => {
  const width = 10
  const $grid = $('.grid')
  let playerIndex = 90
  let aliensIndex = 0
  let shootingIndex


  //------------- create square grid with divs ----------------
  $grid.attr('data-width', width)

  for(let i = 0; i < width*width; i++) {
    $grid.append($('<div/>'))
  }

  //---------- place the player at the bottom of the grid --------
  const $squares = $('.grid div')
  $squares.eq(playerIndex).addClass('player')

  // --------- function to move player -----------
  function movePlayer() {
    $squares.eq(playerIndex).addClass('player')
  }

  // ------------- event listerner to move player ----------------

  $(document).on('keydown', e => {

    $squares.eq(playerIndex).removeClass('player')
    //move player left 37
    switch(e.keyCode) {
      case 37: if(playerIndex % width > 0)
        playerIndex--
        break
        // move player right 39
      case 39: if(playerIndex % width < width-1)
        playerIndex++
        break
        // fire at space bar
      case 32:
        console.log('FIRE AT ' + playerIndex)
        drawMissile()
    }
    movePlayer()
  })

  // -------- create Missile function from the player  ----------
  function drawMissile(){
    // when spacebar is pressed add lazer class to the current position of the player
    $squares.eq(playerIndex-width).addClass('missile')
  }

  // -------------- create aliens on top ------------------------
 // let enemies = []

  function aliens() {
    for(let i = 0; i < 10; i++){
      $squares.eq([i]).addClass('aliens')
    }
  }

  aliens()
})
