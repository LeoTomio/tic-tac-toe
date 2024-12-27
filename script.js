const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winnerMessage");
const restartButton = document.getElementById("restartButton");
let isCircleTurn = false;
let gameOver = false; // Controle do estado do jogo

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;
  gameOver = false; // Reiniciar o estado do jogo
  winnerMessage.classList.add("hidden");
  cells.forEach(cell => {
    cell.classList.remove("x", "circle", "taken");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
};

const endGame = (winner) => {
  gameOver = true; // Define o jogo como finalizado
  winnerMessage.textContent = winner
    ? `Jogador ${winner} venceu!`
    : "Empate!";
  winnerMessage.classList.remove("hidden");
};

const checkWin = (currentClass) => {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

const checkDraw = () => {
  return [...cells].every(cell => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
  cell.textContent = classToAdd === "x" ? "X" : "O";
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
};

const handleClick = (e) => {
  if (gameOver) return; // Impede interação após o fim do jogo

  const cell = e.target;
  const currentClass = isCircleTurn ? "circle" : "x";
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(currentClass === "x" ? "X" : "O");
  } else if (checkDraw()) {
    endGame(null);
  } else {
    swapTurns();
  }
};

restartButton.addEventListener("click", startGame);

startGame();
