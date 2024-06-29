const result = document.querySelector('.js-result');
const startTextElement = document.querySelector('.press-text');
const resetBtnElement = document.querySelector('.reset-btn');
const scoreResetElement = document.querySelector('.score-reset-text');
const playerPickElement = document.querySelector('.js-picked-player');
const computerPickElement = document.querySelector('.js-picked-computer');

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

document.addEventListener('DOMContentLoaded', function() {
    hideResultImages(); 
});

updateScoreElement(); 

function getComputerMove() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playGame(playerMove) {
    scoreResetElement.innerHTML = '';
    const computerMove = getComputerMove();

    if (computerMove === 'Rock') {
        if (playerMove === 'Paper') {
            result.innerHTML = 'You win!';

        } else if (playerMove === 'Scissors') {
            result.innerHTML = 'You lose!';

        } else if (playerMove === 'Rock') {
            result.innerHTML = 'It\'s a tie!';

        }
    } else if (computerMove === 'Paper') {
        if (playerMove === 'Paper') {
            result.innerHTML = 'It\'s a tie!';
        } else if (playerMove === 'Scissors') {
            result.innerHTML = 'You win!';
        } else if (playerMove === 'Rock') {
            result.innerHTML = 'You lose!';
        }
    } else if (computerMove === 'Scissors') {
        if (playerMove === 'Paper') {
            result.innerHTML = 'You lose!';
        } else if (playerMove === 'Scissors') {
            result.innerHTML = 'It\'s a tie!';
        } else if (playerMove === 'Rock') {
            result.innerHTML = 'You win!';
        }
    }
    /*shows result*/ 
    if (result.innerHTML === "You win!") {
        score.wins++;
    } else if (result.innerHTML === "You lose!") {
        score.losses++;
    } else if (result.innerHTML === "It's a tie!") {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement(); 

    /*html to show results*/
    playerPickElement.innerHTML = 'You';
    computerPickElement.innerHTML = 'Computer';
    document.querySelector('.js-player-move').innerHTML = `${playerMove}`;
    document.querySelector('.js-computer-move').innerHTML = `${computerMove}`;
    document.querySelector('.js-player-move-img').src = `/images/${playerMove}.png`
    document.querySelector('.js-computer-move-img').src = `/images/${computerMove}.png`
    
    showResultImages();

    /*resets the text on press to play*/
    startTextElement.innerHTML = 'Press again to keep playing!';

    changeResultColor();
}

function updateScoreElement() {
    /*updates score*/ 
    document.querySelector('.js-score-wins').innerHTML = `${score.wins}`;
    document.querySelector('.js-score-losses').innerHTML = `${score.losses}`;
    document.querySelector('.js-score-ties').innerHTML = `${score.ties}`;
}

function resetScore() {
    /*resets score*/
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    scoreResetElement.innerHTML = 'Score reset!';
    updateScoreElement();
    
    /*resets the html elements as well*/
    document.querySelector('.js-moves').innerHTML = '';
    result.innerHTML = '';
    startTextElement.innerHTML = 'Press on a button to start playing!';
    playerPickElement.innerHTML = '';
    computerPickElement.innerHTML = '';
    document.querySelector('.js-player-move').innerHTML = '';
    document.querySelector('.js-computer-move').innerHTML = '';   
    hideResultImages();
}

function changeResultColor(){
    /*changes the color of the result title depending on a win a tie or a loss*/
    if (result.innerHTML === 'You win!'){
        result.classList.add('result-win');
        result.classList.remove('result-lose');
        result.classList.remove('result-tie');
    } else if (result.innerHTML === 'You lose!'){
        result.classList.add('result-lose');
        result.classList.remove('result-win');
        result.classList.remove('result-tie');
    } else if( result.innerHTML === "It's a tie!"){
        result.classList.add('result-tie');
        result.classList.remove('result-lose');
        result.classList.remove('result-win');
    }
}



function hideResultImages(){
    /*hides images of moves picked*/
    document.querySelector('.js-computer-move-img').style.display = 'none';
    document.querySelector('.js-player-move-img').style.display = 'none';
}

function showResultImages(){
    /*shows images of moves picked*/
    document.querySelector('.js-computer-move-img').style.display='block';
    document.querySelector('.js-player-move-img').style.display='block';
}