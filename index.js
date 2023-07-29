const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    niderlagen: 0,
    unentschieden: 0
}

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
        playGame('stein');
    } else if(event.key === 's') {
        playGame('schere');
    } else if (event.key === 'p') {
        playGame('papier');
    }
})

document.querySelector('.gameScore').innerHTML = `Wins: ${score.wins}, Niderlagen: ${score.niderlagen}, Unentschieden: ${score.unentschieden}`;


function playGame(playersMove) {

    const computerMove = pickComputerMove();

    let result = "";

    if (playersMove === 'schere') {
        if (computerMove === "stein") {
            result = "Du hast die Runde verloren.";
        } else if (computerMove === "papier") {
            result = "Du hast die Runde gewonnen.";
        } else if (computerMove === "schere") {
            result = "Unentschieden.";
        }

    } else if (playersMove === 'stein') {
        if (computerMove === "stein") {
            result = "Unentschieden.";
        } else if (computerMove === "papier") {
            result = "Du hast die Runde verloren.";
        } else if (computerMove === "schere") {
            result = "Du hast die Runde gewonnen.";
        }

    } else if (playersMove === "papier") {
        if (computerMove === "stein") {
            result = "Du hast die Runde gewonnen.";
        } else if (computerMove === "papier") {
            result = "Unentschieden.";
        } else if (computerMove === "schere") {
            result = "Du hast die Runde verloren.";
        }
    }

    if (result === 'Du hast die Runde gewonnen.') {
        score.wins += 1;
    } else if (result === 'Du hast die Runde verloren.') {
        score.niderlagen += 1;
    } else if (result === 'Unentschieden.') {
        score.unentschieden += 1;
    }

    if (score.wins === 3) {
        document.querySelector('.gameScore').innerHTML = `Wins: ${score.wins}, Losses: ${score.niderlagen}, Ties: ${score.unentschieden}`;
        document.querySelector('.gameResult').innerHTML = `Du hast das Spiel gewonnen.`;
        resetScore();
        return;
    } else if (score.niderlagen === 3) {
        document.querySelector('.gameScore').innerHTML = `Wins: ${score.wins}, Losses: ${score.niderlagen}, Ties: ${score.unentschieden}`;
        document.querySelector('.gameResult').innerHTML = `Du hast das Spiel verloren.`;
        resetScore();
        return;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

    document.querySelector('.gameResult').innerHTML = `${result}`;
    document.querySelector('.gameMove').innerHTML = `Du hast ${playersMove} ausgewählt. Dein Gegner hat ${computerMove} ausgewählt.`;
}

function pickComputerMove() {

    const randomNumber = Math.random();

    let computerMove = "";

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "stein";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "papier";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = "schere";
    }

    return computerMove;
}

function resetScore() {
    score.wins = 0;
    score.niderlagen = 0;
    score.unentschieden = 0;
    localStorage.removeItem('score');
    updateScore();
}

function updateScore() {
    document.querySelector('.gameScore').innerHTML = `Wins: ${score.wins}, Niderlagen: ${score.niderlagen}, Unentschieden: ${score.unentschieden}`;
    document.querySelector('.gameResult').innerHTML = ``;
    document.querySelector('.gameMove').innerHTML = ``;
}