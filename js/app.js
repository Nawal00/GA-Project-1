$(() => {
  const width = 10
  const $grid = $('.grid')
  let playerIndex = 95
  let shootingIndex = 0


  //------------- create 10 x 10 grid with divs ----------------
  $grid.attr('data-width', width)

  for(let i = 0; i < width*width; i++) {
    $grid.append($('<div/>'))
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
      case 37: if(playerIndex % width > 0)
        playerIndex--
        break
        // move player right 39
      case 39: if(playerIndex % width < width-1)
        playerIndex++
        break
        // fire at space bar
      case 32:
        console.log('FIRED at ' + playerIndex)
        drawMissile()
    }
    movePlayer()
  })

  // -------- draw Missile function ----------
  function drawMissile(){
    const gameLoop = new GameLoop(playerIndex)
    gameLoop.loop()
  }

  function moveMissiles(playerIndex, offset) {
    console.log(playerIndex - (width*offset))
    $divs.eq(playerIndex-(width * offset)).addClass('missile')
    $divs.eq(playerIndex-(width * (offset -1))).removeClass('missile')
  }

  function GameLoop(playerIndex){

    this.currentIndex = 0
    this.playerIndex = playerIndex

    this.loop = () => {
      this.interval = setInterval(() => {
        if (this.currentIndex >= 8) {
          clearInterval(this.interval)
        }
        this.currentIndex = this.currentIndex + 1
        moveMissiles(this.playerIndex, this.currentIndex)
      }, 200)
    }
  }

  // -------------- create aliens on top ------------------------
 // let enemies = []

  function aliens() {
    for(let i = 0; i < 10; i++){
      $divs.eq([i]).addClass('aliens')
    }
  }

  aliens()
})
