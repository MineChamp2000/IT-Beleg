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

function openStatistics() {
  hide(cardMenu);
  hide(cardWelcome);
  hide(cardQuestion);
  show(cardStatistics);
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

openWelcome();
