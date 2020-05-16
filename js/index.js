function require(file) {
  var script = document.createElement("script");
  script.src = file;
  script.type = "text/javascript";
  script.defer = true;

  document.getElementById("scripts").appendChild(script);
}

/**
 * Macht Fragen über allquestions.teilMathe bzw.
 * allquestions.teilAllgemein aufrufbar
 */
require("res/aufgabenpool.js");

function startMathQuiz() {
  console.log(allquestions.teilMathe);
}

function startGeneralQuiz() {
  console.log(allquestions.teilAllgemein);
}
