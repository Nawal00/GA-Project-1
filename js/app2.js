$(() => {
  const $grid = $('.grid')
  const width = 20
  let playerIndex = 388
  let alien = 10


  //------------- create 20 x 20 grid divs ---------------

  for(let i = 0; i < width*width; i++) {
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
      case 37: if(playerIndex %($divs.length- width))
        playerIndex--
        break
        // move player right 39
      case 39: if(playerIndex <($divs.length -1))
        playerIndex++
        break
        // fire on space bar press
      case 32:
        moveMissile(playerIndex, -width )
    }
    movePlayer()
  })

  // -------- move Missile function ----------
  let deadAlienIndex

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
        deadAlienIndex = shootingIndex
        console.log(` dead alien index is ${deadAlienIndex}`)
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


// -------------- add aliens on top row   ------------------------
let alienArr = []
// adds 9 aliens to the top row
function createAliens(aliensIndex, className) {
  let aliensIndex = index

  for(let i = 0; i<aliens; i++)
    // remove aliens on index 0 then 1 when they move right
    // remove aliens on index 9 & 8 when they move to left
     alienArr.push(alienArr)

    }

  createAliens(0, 'aliens')






  // // remove previous row of aliens
  // function removeAliens(currentAliensIndex) {
  //   for(let i = 0; i <=9; i++){
  //     $divs.eq(i + currentAliensIndex).removeClass('aliens')
  //   }
  // }
  //
  // //-------------- moves aliens on the row to right & then to left ---------------
  //
  // // const moveAliens = [0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0]
  //
  // function makeRowMoves(direction) {
  //
  //   let startIndexes
  //   let rowMoveCount = 0
  //   const rightMoves = [0,1,2]
  //   const leftMoves = [2,1,0]
  //
  //   if (direction === 'right') {
  //     //aliens moves to right edge
  //     startIndexes = rightMoves
  //   }
  //
  //   if (direction === 'left') {
  //     //aliens moves to left edge
  //     startIndexes = leftMoves
  //   }
  //
  //   stepAliens(currentAliensIndex, startIndexes[rowMoveCount])
  //
  //   rowMoveCount ++
  //
  //   //------------------ move aliens down a row ------------------
  //
  //   const interval = setInterval(() => {
  //     // if the aliens reaches edge of the grid row is 3
  //     if (rowMoveCount === 3) {
  //       //move aiens down a row if aliens reaches rowMoveCount 3
  //       currentAliensIndex = currentAliensIndex + width
  //
  //       if (direction === 'right') {
  //         makeRowMoves('left')
  //         //remove aliens on the row above
  //         removeAliens(currentAliensIndex -width)
  //       }
  //
  //       if(direction === 'left') {
  //         makeRowMoves('right')
  //         removeAliens(currentAliensIndex -width)
  //       }
  //       clearInterval(interval)
  //       return
  //     }
  //
  //     stepAliens(currentAliensIndex, startIndexes[rowMoveCount])
  //     rowMoveCount ++
  //   }, 1000)
  // }
  //
  // makeRowMoves('right')

})


  let alienIndex
  function handleAlienBomb(alienshotIndex, alienBomb){

    // const bombInterval =
    // setInterval(() => {

      for (let i=0; i < alienArray.length; i++) {
        const rng = Math.floor(Math.random()*alienArray.length)
        alienIndex = alienArray[rng]
        console.log(alienIndex)
      }

      let alienShootingIndex = alienIndex
}
  //     $divs.eq(alienIndex + alienBomb).addClass('alienBomb')
  //     // remove its current position
  //     $divs.eq(alienIndex).removeClass('alienBomb')
  //     // current position is reassigned to new position
  //     alienIndex += width
  //     // when the missile hits the alien remove the aliens
  //
  //     // clearInterval(bombInterval)
  //   },100)
  // }
  handleAlienBomb(alienIndex, + width)
