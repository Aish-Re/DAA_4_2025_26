const boardElement = document.getElementById('board');
const nInput = document.getElementById('boardSize');
const nValueLabel = document.getElementById('nValue');
const speedInput = document.getElementById('speed');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const callsLabel = document.getElementById('calls');
const conflictsLabel = document.getElementById('conflicts');
const statusLabel = document.getElementById('status');

let N = parseInt(nInput.value);
let board = [];
let isSolving = false;
let recursiveCalls = 0;
let conflictsFound = 0;

// Initialize the board UI
function initBoard() {
    N = parseInt(nInput.value);
    boardElement.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
    boardElement.innerHTML = '';
    board = Array(N).fill().map(() => Array(N).fill(0));
    
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            const cell = document.createElement('div');
            cell.className = `cell ${(r + c) % 2 === 0 ? 'white' : 'black'}`;
            cell.id = `cell-${r}-${c}`;
            boardElement.appendChild(cell);
        }
    }
    
    recursiveCalls = 0;
    conflictsFound = 0;
    updateStats();
    statusLabel.innerText = 'Idle';
    statusLabel.className = 'status-idle';
}

function updateStats() {
    callsLabel.innerText = recursiveCalls;
    conflictsLabel.innerText = conflictsFound;
}

const sleep = () => {
    const ms = 101 - speedInput.value; // Invert speed: 1 is slow (100ms), 100 is fast (1ms)
    return new Promise(resolve => setTimeout(resolve, ms * 5)); // Scaled for better visibility
};

async function isSafe(row, col) {
    // Current cell highlight
    const currentCell = document.getElementById(`cell-${row}-${col}`);
    currentCell.classList.add('current');
    await sleep();

    // Check column
    for (let i = 0; i < row; i++) {
        const checkCell = document.getElementById(`cell-${i}-${col}`);
        if (board[i][col] === 1) {
            currentCell.classList.remove('current');
            currentCell.classList.add('conflict');
            checkCell.classList.add('conflict');
            conflictsFound++;
            updateStats();
            await sleep();
            checkCell.classList.remove('conflict');
            currentCell.classList.remove('conflict');
            return false;
        }
    }

    // Check upper left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
            const checkCell = document.getElementById(`cell-${i}-${j}`);
            currentCell.classList.remove('current');
            currentCell.classList.add('conflict');
            checkCell.classList.add('conflict');
            conflictsFound++;
            updateStats();
            await sleep();
            checkCell.classList.remove('conflict');
            currentCell.classList.remove('conflict');
            return false;
        }
    }

    // Check upper right diagonal
    for (let i = row, j = col; i >= 0 && j < N; i--, j++) {
        if (board[i][j] === 1) {
            const checkCell = document.getElementById(`cell-${i}-${j}`);
            currentCell.classList.remove('current');
            currentCell.classList.add('conflict');
            checkCell.classList.add('conflict');
            conflictsFound++;
            updateStats();
            await sleep();
            checkCell.classList.remove('conflict');
            currentCell.classList.remove('conflict');
            return false;
        }
    }

    currentCell.classList.remove('current');
    return true;
}

async function solveNQueens(row) {
    if (!isSolving) return false;
    
    if (row >= N) {
        return true;
    }

    recursiveCalls++;
    updateStats();

    for (let col = 0; col < N; col++) {
        if (!isSolving) return false;

        if (await isSafe(row, col)) {
            // Place queen
            board[row][col] = 1;
            const cell = document.getElementById(`cell-${row}-${col}`);
            cell.innerHTML = '<span class="queen">👑</span>';
            
            if (await solveNQueens(row + 1)) {
                return true;
            }

            // Backtrack
            if (!isSolving) return false;
            board[row][col] = 0;
            cell.innerHTML = '';
        }
    }

    return false;
}

nInput.addEventListener('input', () => {
    nValueLabel.innerText = nInput.value;
    if (!isSolving) initBoard();
});

startBtn.addEventListener('click', async () => {
    if (isSolving) return;
    
    initBoard();
    isSolving = true;
    startBtn.disabled = true;
    nInput.disabled = true;
    statusLabel.innerText = 'Solving...';
    statusLabel.className = 'status-running';

    if (await solveNQueens(0)) {
        statusLabel.innerText = 'Solution Found!';
        statusLabel.className = 'status-solved';
    } else {
        if (isSolving) {
            statusLabel.innerText = 'No Solution Exists';
            statusLabel.className = 'status-idle';
        }
    }
    
    isSolving = false;
    startBtn.disabled = false;
    nInput.disabled = false;
});

resetBtn.addEventListener('click', () => {
    isSolving = false;
    setTimeout(initBoard, 100); // Small delay to let recursion exit
});

// Start with initial board
initBoard();
