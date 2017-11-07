'use strict';

const newGameBtn = document.getElementById('js-newGameButton');
const pickRock = document.getElementById('js-playerPick_rock');
const pickPaper = document.getElementById('js-playerPick_paper');
const pickScissors = document.getElementById('js-playerPick_scissors');
const playerPickElem = document.getElementById('js-playerPick');
const computerPickElem = document.getElementById('js-computerPick');
const playerResultElem = document.getElementById('js-playerResult');
const computerResultElem = document.getElementById('js-computerResult');
const newGameElem = document.getElementById('js-newGameElement');
const pickElem = document.getElementById('js-playerPickElement');
const resultsElem = document.getElementById('js-resultsTableElement');
const drawElem = document.getElementById('js-draw');
const playerPointsElem = document.getElementById('js-playerPoints');
const computerPointsElem = document.getElementById('js-computerPoints');
newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', () => { playerPick('rock') });
pickPaper.addEventListener('click', () => { playerPick('paper') });
pickScissors.addEventListener('click', () => { playerPick('scissors')});

const player = {
    name: '',
    score: 0
};

const computer = {
    score: 0
};

function newGame() {
    const playerNameElem = document.getElementById('js-playerName');
    if (player.name === '') {
        player.name = prompt('Please enter your name', 'imię gracza');
    }
    showHideWinner();
    if (player.name) {
        player.score = 0;
        computer.score = 0;
        setGameElements('started');
        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }
}

function setGameElements(gameState, winner) {
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
    const computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
    hideLastRoundWinner()
    
    if (playerPick == computerPick) {
        announceRoundWinnder();
        
    } else if (
        (computerPick === 'rock' && playerPick === 'scissors') ||
        (computerPick === 'scissors' && playerPick === 'paper') ||
        (computerPick === 'paper' && playerPick === 'rock')) {
        addRoundPoints(computer);   
    } else {
        addRoundPoints(player);   
    }

    setGamePoints();
    checkGameWinner();
}

function hideLastRoundWinner() {
    playerResultElem.innerHTML = '';
    computerResultElem.innerHTML = '';
    drawElem.innerHTML = '';
}

function addRoundPoints(winner) {
     winner.score++
     announceRoundWinnder(winner);
}

function announceRoundWinnder(winner) {
    if (winner == player) {
        playerResultElem.innerHTML = "Win!";
    } else if (winner == computer) {
        computerResultElem.innerHTML = "Win"      
    } else {
        drawElem.innerHTML = "Draw"; 
    }
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function checkGameWinner() {
    if (player.score >= 10) {
        showHideWinner(player.name);
        setGameElements('ended');
    }
    if (computer.score >= 10) {
        showHideWinner('Computer');
        setGameElements('ended');
    }
}

function showHideWinner(winner) {
    const div = document.getElementById('js-playerWin');
    const p = document.getElementById('js-winner');
    if (!winner) {
        div.style.display= 'none';
        p.innerHTML = '';
    } else
    div.style.display= 'inline';
    p.innerHTML = `And the winner is... ${winner}`;
}

setGameElements();