const wordDisplay = document.getElementById("word-display");
const wrongLettersDisplay = document.getElementById("wrong-letters-display");
const chancesCount = document.getElementById("chances-count");
const message = document.getElementById("message");
const letterButtons = document.getElementById("letter-buttons");
const resetButton = document.getElementById("reset-button");

let word = "";
let guessedWord = [];
let wrongLetters = [];
let remainingChances = 10;
let gameStatus = "playing";

async function startGame() {
  try {
    const response = await fetch("/start_game", { method: "POST" });
    const data = await response.json();

    word = data.word;
    guessedWord = data.masked_word;
    wrongLetters = [];
    remainingChances = data.remaining_chances;
    gameStatus = data.game_status;

    updateDisplay();
    createLetterButtons();
  } catch (error) {
    console.error("Error starting game:", error);
  }
}

function updateDisplay() {
  wordDisplay.innerHTML = guessedWord
    .map((letter) => `<div class="letter-box">${letter}</div>`)
    .join("");
  wrongLettersDisplay.textContent = wrongLetters.join(", ");
  chancesCount.textContent = remainingChances;

  if (gameStatus === "won") {
    message.textContent = "Congrats! You have guessed the right word";
    message.style.color = "green";
    disableAllButtons();
  } else if (gameStatus === "lost") {
    message.textContent = `Game Over! The word was: ${word}`;
    message.style.color = "red";
    disableAllButtons();
  } else {
    message.textContent = "";
  }
}

function createLetterButtons() {
  letterButtons.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => guessLetter(letter.toLowerCase()));
    letterButtons.appendChild(button);
  }
}

async function guessLetter(letter) {
  try {
    const response = await fetch("/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: word,
        guessed_word: guessedWord,
        guessed_letter: letter,
        wrong_letters: wrongLetters,
        remaining_chances: remainingChances,
      }),
    });

    const data = await response.json();
    guessedWord = data.guessed_word;
    wrongLetters = data.wrong_letters;
    remainingChances = data.remaining_chances;
    gameStatus = data.game_status;

    updateDisplay();
    disableButton(letter.toUpperCase());
  } catch (error) {
    console.error("Error guessing letter:", error);
  }
}

function disableButton(letter) {
  const button = Array.from(letterButtons.children).find(
    (btn) => btn.textContent === letter
  );
  if (button) {
    button.disabled = true;
  }
}

function disableAllButtons() {
  Array.from(letterButtons.children).forEach((button) => {
    button.disabled = true;
  });
}

resetButton.addEventListener("click", startGame);

startGame();
