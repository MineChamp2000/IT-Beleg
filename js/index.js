function require(file) {
  var script = document.createElement("script");
  script.src = file;
  script.type = "text/javascript";
  script.defer = true;

  document.getElementById("scripts").appendChild(script);
}

var cardWelcome = document.getElementById("card-welcome");
var cardMenu = document.getElementById("card-menu");
var cardQuestion = document.getElementById("card-question");
var cardStatistics = document.getElementById("card-statistics");

/**
 * Macht Fragen über allquestions.teilMathe bzw.
 * allquestions.teilAllgemein aufrufbar
 */
require("res/aufgabenpool.js");

/**
 * class Quiz + ProgressBar
 */
require("js/quiz.js");
require("js/progressbar.js");

function startMathQuiz() {
  new Quiz(allquestions.teilMathe, "mathe").start();
}

function startGeneralQuiz() {
  new Quiz(allquestions.teilAllgemein, "allgemein").start();
}

function openWelcome() {
  hide(cardMenu);
  show(cardWelcome);
  hide(cardQuestion);
  hide(cardStatistics);
}

function openMenu() {
  show(cardMenu);
  hide(cardWelcome);
  hide(cardQuestion);
  hide(cardStatistics);
}

function openQuestion() {
  hide(cardMenu);
  hide(cardWelcome);
  show(cardQuestion);
  hide(cardStatistics);
}

function openStatistics(ammCorrect, ammTotal) {
  hide(cardMenu);
  hide(cardWelcome);
  hide(cardQuestion);
  show(cardStatistics);

  let bar = new ProgressBar("statisticsbar");
  bar.setValue((ammCorrect / ammTotal) * 100);

  document.getElementById("statistics-amm-correct").innerHTML =
    ammCorrect + " richtig";
  document.getElementById("statistics-amm-wrong").innerHTML =
    ammTotal - ammCorrect + " falsch";
}

function show(element) {
  setTimeout(function () {
    element.style.display = "block";
    setTimeout(function () {
      if (element.classList.contains("hidden"))
        element.classList.remove("hidden");
    }, 300);
  }, 300);
}

function hide(element) {
  if (!element.classList.contains("hidden")) element.classList.add("hidden");

  setTimeout(function () {
    element.style.display = "none";
  }, 300);
}

initAnswerEventListeners = (ids) => {
  ids.array.forEach((id) => {
    document
      .getElementById(id)
      .addEventListener("click", this.checkAnswer.bind(this));
  });
};

var confirming = false;

cancelGame = async () => {
  if (confirming) {
    openWelcome();
    return;
  }
  confirming = true;
  let bCancel = document.getElementById("button-cancel-game");
  bCancel.innerHTML = "Abbruch Bestätigen (3)";
  setTimeout(() => {
    bCancel.innerHTML = "Abbruch Bestätigen (2)";
  }, 1000);
  setTimeout(() => {
    bCancel.innerHTML = "Abbruch Bestätigen (1)";
  }, 2000);
  setTimeout(() => {
    bCancel.innerHTML = "Spiel abbrechen";
    confirming = false;
  }, 3000);
};

openWelcome();
