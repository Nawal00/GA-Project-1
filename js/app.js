$(() => {
  // const width = 10
  const $grid = $('.grid')
  let playerIndex = 95
  let shootingIndex = 0



  //------------- create 10 x 10 grid with divs ----------------
  // $grid.attr('data-width', width)

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
    console.log(playerIndex - (10 * offset))
    $divs.eq(playerIndex-(10 * offset)).addClass('missile')
    $divs.eq(playerIndex-(10 * (offset -1))).removeClass('missile')
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



  // adds 8 aliens to the top row
  // offset is initially is 0 and icrements in 10,
  function stepAliens(offset) {
    for(let i = 1; i <= 8; i++){
      $divs.eq([i + offset]).addClass('aliens')
    }
  }

  function removeAliens(offset) {
    // if offset is greater or equal to 20
    if(offset >=20 ) {
      for(let i = 1; i <=8; i++){
        // 1 + 21 - 20 = 1 remove class from 1
        $divs.eq(i + offset -20).removeClass('aliens')
      }
    }
  }

  let currentAliensIndex = 0
  stepAliens(currentAliensIndex)

  setInterval(() => {
    currentAliensIndex = currentAliensIndex + 10
    //step add aliens curr index + 10
    stepAliens(currentAliensIndex)
    //step add aliens curr index - 20
    removeAliens(currentAliensIndex)
  }, 2000)


})
