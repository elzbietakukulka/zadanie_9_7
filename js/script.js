/********************* WYBÓR GRACZY ************************/
var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
var newGameBtn = document.getElementById('js-newGameButton');
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

/********************* Event Listeners ************************/ 
newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });


/****************** Initialize variables with initual values ***************/
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

/************* USTAWIANIE PLANSZY ******************/

function setGameElements() {
    
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
      break;
    case 'notStarted':
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
      break;
    default:
        break;
  }
  
}

/************************* NOWA GRA ********************/

function newGame() {
  
  player.name = prompt('Please enter your name', 'imię gracza');
  
  if (player.name.length > 0) {
    
    player.score = 0;
    computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }

}

/*********************** WYBÓR GRACZA **************************/

function playerPick(playerPick) {
  
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
  
    setGameEnd();
}

/******************** LOSOWANIE WYBORU KOMPUTERA *********************/

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

/*********************** SPRAWDZANIE KTO WYGRAŁ ***************/

function checkRoundWinner(playerPick, computerPick) {
  
  playerResultElem.innerHTML = '';
  computerResultElem.innerHTML = '';

    if (playerPick == computerPick) {
        
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        computerResultElem.innerHTML = "Win!";
        computer.score++;
      
    } else {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    }
  
        setGamePoints();
}

/************** AKTUALZIOWANIE PUNKTÓW W HTML ***************/

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

/************ CHECK GAME END ***************/

function setGameEnd() {
    
    var winningNumber = 10;
    
    if (player.score == winningNumber) {
        gameState = 'ended';
        alert("Congratulations " + player.name + ", you win!");
        setGameElements();
        
    } else if (computer.score == winningNumber) {
         gameState = 'ended';
         alert("Sorry " + player.name + ", you lost");
         setGameElements();
    }
}

/********************* POCZĄTEK GRY ************************/
setGameElements();