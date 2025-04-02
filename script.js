let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

// Game screens
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

// Elements for turn info and buttons
const turnInfo = document.getElementById("turn-info");
const resetBtn = document.getElementById("reset-btn");
const newGameBtn = document.getElementById("new-game-btn");
const endMessage = document.getElementById("end-message");

// Function to handle a click on a square
function handleSquareClick(index) {
    if (gameBoard[index] !== "" || isGameOver) return; // Square already filled or game over

    // Mark the square with the current player's symbol
    gameBoard[index] = currentPlayer;
    document.getElementById(`square-${index}`).textContent = currentPlayer;

    // Check for a winner
    if (checkWinner()) {
        endGame(`Player ${currentPlayer} Wins!`);
    } else if (gameBoard.every(square => square !== "")) {
        endGame("It's a Draw!");
    } else {
        // Switch to the other player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnInfo.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Function to check if there's a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

// Function to end the game
function endGame(message) {
    isGameOver = true;
    endMessage.textContent = message;
    startScreen.style.display = "none";
    gameScreen.style.display = "none";
    endScreen.style.display = "block";
}

// Function to reset the game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    isGameOver = false;
    currentPlayer = "X";
    turnInfo.textContent = `Player X's Turn`;

    for (let i = 0; i < 9; i++) {
        document.getElementById(`square-${i}`).textContent = "";
    }

    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    endScreen.style.display = "none";
}

// Start new game from the end screen
function startNewGame() {
    resetGame();
    startScreen.style.display = "block";
    endScreen.style.display = "none";
}

// Event Listeners
document.getElementById("start-btn").addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", startNewGame);

// Add event listeners for the squares
for (let i = 0; i < 9; i++) {
    document.getElementById(`square-${i}`).addEventListener("click", () => handleSquareClick(i));
}
