"use strict";
//get all the elements in our page
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

const word = document.getElementById("word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const endGameEl = document.querySelector(".end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultyLevel = document.getElementById("difficulty");

//initial word
let randomWord;

//initial score
let score = 0;

//initial time
let time = 10;

//this is my interval
let intervalId;

//this is the difficulty
let difficulty = "easy";
difficultyLevel.addEventListener("change", function (e) {
  difficulty = e.target.value;
  startGame();
});

//get a Randomword
function getWordRandom() {
  let wordsFiltered;
  if (difficulty === "easy") {
    wordsFiltered = words.filter((word) => {
      if (word.length < 6) {
        return word;
      }
    });
  }
  if (difficulty === "medium") {
    wordsFiltered = words.filter((word) => {
      if (word.length >= 6 && word.length < 9) {
        return word;
      }
    });
  }
  if (difficulty === "hard") {
    wordsFiltered = words.filter((word) => {
      if (word.length >= 9) {
        return word;
      }
    });
  }

  console.log(wordsFiltered);
  randomWord = wordsFiltered[Math.floor(Math.random() * wordsFiltered.length)];
}

//initialize my game
function startGame() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  text.value = "";
  text.focus = "on";
  endGameEl.style.display = "none";
  time = 10;
  getWordRandom();
  word.innerText = randomWord;
  startCounter();
}
startGame();

//function will start counter
function startCounter() {
  intervalId = setInterval(() => {
    time -= 1;
    if (time === 0) {
      clearInterval(intervalId);
      gameOver();
    }
    timeEl.innerHTML = time;
  }, 1000);
}

//function game over
function gameOver() {
  endGameEl.style.display = "block";
  //create a button
  // append that button to endgameEl
  const timeRanOut = document.createElement("h2");
  timeRanOut.innerText = "Time Ran Out";
  const btnReload = document.createElement("button");
  btnReload.innerText = "Reload";
  btnReload.style.display = "block";
  btnReload.style.margin = " 1rem auto";

  scoreEl.innerHTML = `Your score is: ${score}`;
  endGameEl.appendChild(timeRanOut);
  endGameEl.appendChild(scoreEl);
  endGameEl.appendChild(btnReload);

  btnReload.addEventListener("click", function () {
    startGame();
    endGameEl.innerHTML = "";
  });
}

//function will check if value in input is matching the random word
text.addEventListener("keyup", function (e) {
  if (e.target.value === randomWord) {
    score++;
    scoreEl.innerText = score;
    startGame();
  }
});

settingsBtn.addEventListener("click", function () {
  settings.classList.toggle("hide");
});
