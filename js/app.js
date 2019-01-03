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



})
