const restart = document.getElementById('restart-button');
const xClass = 'X';
const circleClass = 'O';
let circTurn;
const winningText = document.querySelector('[winning-message-text]');
const winningTextElement = document.getElementById('winningText');

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


restart.addEventListener('click', reloadGame);

function reloadGame () {
    circTurn = false;
    location.reload();
}

let eddy = 0

let row = document.querySelectorAll('[cell]');
row.forEach(function (cell) {
    cell.addEventListener('click', rowClicked, { once: true });
});


function rowClicked(e) {
    if (eddy % 2 == 0) {
        e.target.textContent = xClass;
    } else {
        e.target.textContent = circleClass;
    }
    eddy++;
    const cell = e.target;
    const currentClass = circTurn ? circleClass : xClass;
    placeMark(cell, currentClass)
    swapTurns()
    if (checkWin(e.target.textContent)) {
        console.log('winner!');
        gameOver(false);
    } else if (isDraw()) {
        gameOver(true);
    };
    // if (eddy == 9) {
    //     setTimeout(location.reload.bind(location), 2200);
    // };
};


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circTurn = !circTurn;
}

function checkWin(textContent) {
    return winCombos.some(combination => {
        return combination.every(index => {
            return row[index].classList.contains(textContent)
        })
    })
}

function isDraw() {
    return [...row].every(cell => {
        return cell.classList.contains(circleClass) || cell.classList.contains(xClass);
    });
}

function gameOver(draw) {
    if (draw) {
        winningTextElement.innerHTML = 'Draw!';
    } else {
        winningText.innerHTML = `${circTurn ? "X's" : "O's"} Win!`;
    }
    winningTextElement.classList.add('show');
}
