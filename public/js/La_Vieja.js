const cells = document.querySelectorAll('.celda');
const turnElement = document.getElementById('turno');
const messageElement = document.getElementById('mensaje');
const restartButton = document.getElementById('reinicio');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    if (gameActive) {
        const cellIndex = parseInt(event.target.dataset.index);
        if (board[cellIndex] === '') {
            board[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add(currentPlayer.toLowerCase());
            checkWin();
            switchPlayer();
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnElement.textContent = currentPlayer;
    if (currentPlayer === 'O') {
        playAutomatically();
    }
}

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            messageElement.textContent = `Ganador: ${currentPlayer}`;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        messageElement.textContent = 'Empate!';
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
    turnElement.textContent = 'X';
    messageElement.textContent = '';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

// Juega el juego automáticamente para el jugador O
function playAutomatically() {
    if (gameActive && currentPlayer === 'O') {
        const emptyCells = [];
        cells.forEach((cell, index) => {
            if (board[index] === '') {
                emptyCells.push(cell);
            }
        });

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            setTimeout(() => {
                handleCellClick({ target: randomCell });
            }, 1000);
        }
    }
}

setTimeout(playAutomatically, 1000);