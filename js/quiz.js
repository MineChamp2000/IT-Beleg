class Quiz {
  constructor(questions) {
    this.questions = questions;

    this.elQuestionTitle = document.getElementById("question-title");
    this.elAnswer1 = document.getElementById("answer-1");
    this.elAnswer2 = document.getElementById("answer-2");
    this.elAnswer3 = document.getElementById("answer-3");
    this.elAnswer4 = document.getElementById("answer-4");
  }

  start() {
    openQuestion();
    this.loadQuestion(this.questions[0]);
  }

  loadQuestion(question) {
    this.currentQuestion = question;

    this.elQuestionTitle.innerHTML = question.a;
    this.elAnswer1.innerHTML = question.l[0];
    this.elAnswer2.innerHTML = question.l[1];
    this.elAnswer3.innerHTML = question.l[2];
    this.elAnswer4.innerHTML = question.l[3];
  }

  checkAnswer(event) {
    if (event.target.textContent === this.currentQuestion.l[0]) {
      //richtig
    } else {
      //falsch
    }
  }
}
