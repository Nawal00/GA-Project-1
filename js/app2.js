const $displayScore = $('.display-score')
const players = $('.players')
const playerScores = JSON.parse(localStorage.getItem('namescore'))


//-------------- display Highscore --------------------

//add submit event listener to the form
function addScore(e){
  // stop page from reloading bc submit reloads the page by default
  e.preventDefault()
  // select and save the value of the form
  const playerName = (this.querySelector('[name=playerName]')).value

  const item = {
    playerName: playerName,
    playerScore: score
  }
  //push item object to playerScores array
  playerScores.push(item)
  fillList(playerScores, players)
  //on pageload we check if we have something on localStorage
  //when you add a item you put it into localStorage
  localStorage.setItem('namescore', JSON.stringify(playerScores))
  this.reset()
}

// func takes in array and html element where the returned value is shown
function fillList(playerNameArray, playerList){
  playerList.html(playerNameArray.map((playerName)=> {
    return `
    <li>
      <label for=""> ${playerName.playerName} </label>
      <label for=""> ${playerName.playerScore} </label>
    </li>
    `
  }).join(''))
}

$displayScore.on('submit', addScore)

fillList(playerScores, players)
