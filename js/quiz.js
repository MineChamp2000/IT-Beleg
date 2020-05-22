class Quiz {
  constructor(questions, type) {
    //type: 'mathe' | 'allgemein'
    this.questions = JSON.parse(JSON.stringify(questions));
    this.type = type;
    this.answeredQuestions = [];

    this.elRightOrWrongContainer = document.getElementById(
      "right-or-wrong-overlay"
    );
    this.elRightOrWrong = document.getElementById("right-or-wrong");

    this.elQuestionTitle = document.getElementById("question-title");
    this.elAnswer1 = document.getElementById("answer-1");
    this.elAnswer2 = document.getElementById("answer-2");
    this.elAnswer3 = document.getElementById("answer-3");
    this.elAnswer4 = document.getElementById("answer-4");
  }

  questionsPerQuiz = 6;

  next = () => {
    if (this.answeredQuestions.length === this.questionsPerQuiz) {
      openStatistics();
    } else {
      var randomQuestion = this.questions[
        Math.floor(Math.random() * this.questions.length)
      ];
      this.questions.splice(this.questions.indexOf(randomQuestion), 1);

      this.loadQuestion(randomQuestion);
    }
    this.progressBar.setValue(
      (this.answeredQuestions.length / this.questionsPerQuiz) * 100
    );
  };

  start = () => {
    openQuestion(); //show card: question
    this.progressBar = new ProgressBar("progressbar");
    this.progressBar.setValue(0);
    this.next();
  };

  loadQuestion = (question) => {
    this.currentQuestion = question;

    this.elQuestionTitle.innerHTML =
      this.type === "mathe" ? `$$${question.a}$$` : question.a;

    var randomOrderedAnswers = this.generateRandomOrderedAnswers(question.l);

    this.removeEventListeners();

    randomOrderedAnswers.forEach((l, index) => {
      this[`elAnswer${index + 1}`].innerHTML =
        this.type === "mathe" ? `$$${l}$$` : l;

      this[`elAnswer${index + 1}`].addEventListener(
        "click",
        this.checkAnswer.bind(
          this,
          index,
          this.currentQuestion.l.indexOf(randomOrderedAnswers[index]),
          randomOrderedAnswers
        )
      );
    });

    this.type === "mathe" && renderMathInElement(document.body);
  };

  generateRandomOrderedAnswers = (arr) => {
    arr = JSON.parse(JSON.stringify(arr));
    var length = arr.length;
    var res = [];
    for (var i = 0; i < length; i++) {
      var rand = Math.floor(Math.random() * arr.length);
      res.push(arr[rand]);
      arr.splice(rand, 1);
    }
    return res;
  };

  async checkAnswer(indexDisplay, indexAnswer, randomOrderedAnswers, event) {
    if (indexAnswer === 0) {
      this.currentQuestion.correct = true; //richtig
    } else {
      this.currentQuestion.correct = false; //falsch
    }
    this.answeredQuestions.push(this.currentQuestion);

    //Auswahl mit logged/notlogged markieren
    this[`elAnswer${indexDisplay + 1}`].classList.add("logged");
    randomOrderedAnswers.forEach((l, i) => {
      if (indexDisplay !== i) {
        this[`elAnswer${i + 1}`].classList.add("notlogged");
      }
    });

    this.showRightOrWrong();

    setTimeout(() => {
      //logged / notlogged wieder entfernen
      randomOrderedAnswers.forEach((l, i) => {
        if (indexDisplay !== i) {
          this[`elAnswer${i + 1}`].classList.remove("notlogged");
        } else {
          this[`elAnswer${i + 1}`].classList.remove("logged");
        }
      });
      this.next();
    }, 1000);
  }

  showRightOrWrong = () => {
    var richtig = this.answeredQuestions[this.answeredQuestions.length - 1]
      .correct;

    this.elRightOrWrongContainer.classList.add("show");
    if (richtig) {
      this.elRightOrWrong.classList.add("success");
      this.elRightOrWrong.innerHTML = "Richtig!";
    } else {
      this.elRightOrWrong.classList.add("error");
      this.elRightOrWrong.innerHTML = "Leider falsch :(";
    }
    setTimeout(() => {
      this.elRightOrWrongContainer.classList.remove("show");
    }, 1000);
    setTimeout(() => {
      this.elRightOrWrong.classList.remove(richtig ? "success" : "error");
    }, 2000);
  };

  removeEventListeners = () => {
    ["1", "2", "3", "4"].forEach((num) => {
      var new_element = this[`elAnswer${num}`].cloneNode(true);
      this[`elAnswer${num}`].parentNode.replaceChild(
        new_element,
        this[`elAnswer${num}`]
      );
      this[`elAnswer${num}`] = new_element;
    });
  };
}
