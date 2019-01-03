$(() => {
  const width = 10
  let playerIndex = 90
  let direction = 'forward'
  const $grid = $('.grid')

  //create square grid with divs
  $grid.attr('data-width', width)

  for(let i = 0; i < width*width; i++) {
    $grid.append($('<div />'))
  }

  //create player at the bottom of the grid
  const $squares = $('.grid div')
  $squares.eq(playerIndex).addClass('player')

  function movePlayer() {
    $squares.eq(playerIndex)
      .addClass('player')
      .attr('data-direction', direction)
  }

  // move player left and right
  $(document).on('keydown', e => {
    // left 37, right 39
    $squares.eq(playerIndex).removeClass('player')

    switch(e.keyCode) {
      case 37: if(playerIndex % width > 0){
        playerIndex--
        direction = 'backward'
      }
        break
      case 39: if(playerIndex % width < width-1) {
        playerIndex++
        direction = 'forward'
      }
        break
    }
    movePlayer()
  })



})
