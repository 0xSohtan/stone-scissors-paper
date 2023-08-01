const playersMoveDiv = document.querySelector('.moves');
const battleScreen = document.querySelector('.battle');

window.onload = function () {
    selectScore();
}

const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    niderlagen: 0,
    unentschieden: 0
}

// document.body.addEventListener('keydown', function pressKeys(event) {
//     if(event.key === 'r') {
//         playGame('Stein');
//     } else if(event.key === 's') {  
//         playGame('Schere');
//     } else if (event.key === 'p') {
//         playGame('Papier');
//     }
// })

function playGame(playersMove) {
    playersMoveDiv.style.display = 'none';
    battleScreen.style.display = 'flex';

    const computerMove = pickComputerMove();
    let result = "";



    if (playersMove === 'Schere') {
        if (computerMove === "Stein") {
            result = "Du hast die Runde verloren.";
        } else if (computerMove === "Papier") { 
            result = "Du hast die Runde gewonnen.";
        } else if (computerMove === "Schere") {
            result = "Unentschieden.";
        }

    } else if (playersMove === 'Stein') {
        if (computerMove === "Stein") {
            result = "Unentschieden.";
        } else if (computerMove === "Papier") {
            result = "Du hast die Runde verloren.";
        } else if (computerMove === "Schere") {
            result = "Du hast die Runde gewonnen.";
        }

    } else if (playersMove === "Papier") {
        if (computerMove === "Stein") {
            result = "Du hast die Runde gewonnen.";
        } else if (computerMove === "Papier") {
            result = "Unentschieden.";
        } else if (computerMove === "Schere") {
            result = "Du hast die Runde verloren.";
        }
    }

    battleScreen.innerHTML = `<img src="assets/${playersMove}.png"><p>vs.</p><img src="assets/${computerMove}.png">`
    
    if (result === 'Du hast die Runde gewonnen.') {
        score.wins += 1;
    } else if (result === 'Du hast die Runde verloren.') {
        score.niderlagen += 1;
    } else if (result === 'Unentschieden.') {
        score.unentschieden += 1;
    }

    if (score.wins === 3) {
        document.querySelector('.gameResult').innerHTML = `Du hast das Spiel gewonnen.`;
        endScreen();
        return;
    } else if (score.niderlagen === 3) {
        document.querySelector('.gameResult').innerHTML = `Du hast das Spiel verloren.`;
        endScreen();
        return;
    }

    setTimeout(() => {
        playersMoveDiv.style.display = 'block';
        battleScreen.innerHTML = '';
    }, 5000);

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

    document.querySelector('.gameResult').innerHTML = `${result}`;
}

function pickComputerMove() {

    const randomNumber = Math.random();

    let computerMove = "";

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "Stein";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "Papier";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = "Schere";
    }

    return computerMove;
}   

function resetScore() {
    score.wins = 0;
    score.niderlagen = 0;   
    score.unentschieden = 0;
    localStorage.removeItem('score');
    playersMoveDiv.style.display = 'block';
    battleScreen.style.display = 'none';
    updateScore();
}

function selectScore() {
    document.querySelector('.scoreWins').innerHTML = `Wins: <strong style="color: green;">${score.wins}</strong>`;
    document.querySelector('.scoreNiderlage').innerHTML = `Niderlage: <strong style="color: red;">${score.niderlagen}</strong>`;
    document.querySelector('.scoreUnentschieden').innerHTML = `Unentschieden: <strong style="color: blue;">${score.unentschieden}</strong>`;
}

function updateScore() {
    selectScore();
    document.querySelector('.gameResult').innerHTML = ``;
    document.querySelector('.gameMove').innerHTML = ``;
}

function endScreen() {
    playersMoveDiv.style.display = 'none';
    selectScore();
    setTimeout(() => {
        battleScreen.style.display = 'none';
    }, 3000);
}