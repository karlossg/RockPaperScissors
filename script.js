const newGameBtn = document.getElementById('js-newGameButton');
const pickRock = document.getElementById('js-playerPick_rock');
const pickPaper = document.getElementById('js-playerPick_paper');
const pickScissors = document.getElementById('js-playerPick_scissors');

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', () => { playerPick('rock') });
pickPaper.addEventListener('click', () => { playerPick('paper') });
pickScissors.addEventListener('click', () => { playerPick('scissors')});

let player = {
    name: '',
    score: 0
};

let computer = {
    score: 0
};

function newGame() {
    const playerNameElem = document.getElementById('js-playerName');
    player.name = prompt('Please enter your name', 'imię gracza');
    hideWinner();
    if (player.name) {
        player.score = 0;
        computer.score = 0;
        setGameElements('started');
        playerNameElem.innerHTML = player.name;
    }
}

function setGameElements(gameState, winner) {
    const newGameElem = document.getElementById('js-newGameElement');
    const pickElem = document.getElementById('js-playerPickElement');
    const resultsElem = document.getElementById('js-resultsTableElement');
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
            hideLastRoundWinner();
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

function getComputerPick() {
    const possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

function playerPick(playerPick) {
    const playerPickElem = document.getElementById('js-playerPick');
    const computerPickElem = document.getElementById('js-computerPick');
    const computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
    const playerResultElem = document.getElementById('js-playerResult');
    const computerResultElem = document.getElementById('js-computerResult');
    const drawElem = document.getElementById('js-draw');
    let winnerIs = 'player';
    playerResultElem.innerHTML = '';
    computerResultElem.innerHTML = '';
    drawElem.innerHTML = '';
    
    if (playerPick == computerPick) {
        winnerIs = 'noone'; 
    } else if (
        (computerPick === 'rock' && playerPick === 'scissors') ||
        (computerPick === 'scissors' && playerPick === 'paper') ||
        (computerPick === 'paper' && playerPick === 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs === 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    } else {
        drawElem.innerHTML = "Draw!";
    }
    setGamePoints();
    checkGameWinner();
}

function hideLastRoundWinner() {
    const playerResultElem = document.getElementById('js-playerResult');
    const computerResultElem = document.getElementById('js-computerResult');
    playerResultElem.innerHTML = '';
    computerResultElem.innerHTML = '';
}

function setGamePoints() {
    const playerPointsElem = document.getElementById('js-playerPoints');
    const computerPointsElem = document.getElementById('js-computerPoints');
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function checkGameWinner() {
    if (player.score >= 10) {
        showWinner(player.name);
        setGameElements('ended');
    }
    if (computer.score >= 10) {
        showWinner('Computer');
        setGameElements('ended');
    }
}

function showWinner(winner) {
    const p = document.getElementById('js-winner')
    p.innerHTML = `And the winner is... ${winner}`;
}

function hideWinner() {
    const p = document.getElementById('js-winner')
    p.innerHTML = '';
}

setGameElements();