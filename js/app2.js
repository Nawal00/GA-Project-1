$(() => {

  let arr = []


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

  //paints the alien
function displayAlienmove(){
  //reomves the aliens
  div.forEach(divs => {
    if(divs.classList.value === 'alien'){
      divs.classList.remove('alien')
    }
  })
  //repaints the aliens
  arr.forEach(alien => {
    div[alien].classList.add('alien')
  })
}

})
