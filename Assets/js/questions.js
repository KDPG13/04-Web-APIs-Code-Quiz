const myQuestions = [
    {
      question: "what does sql stand for:",
      answers: {
        1: "structured query language",
        2: "sequel",
        3: "sequelized query language",
        4: "sql",
      },
      correctAnswer: "tructured query language",
    },
  
    {
      question: "Which tag is used to write the javascript code",
      answers: {
        1: "<script>",
        2: "<sp>",
        3: "<javascript>",
        4: "<java>>",
      },
      correctAnswer: "<script>",
    },
  
    {
      question: "Arrays in JavaScript can be used to store ____________.",
      answers: {
        1: "numbers and strings",
        2: "other arrays",
        3: "booleans",
        4: "all of the above",
      },
      correctAnswer: "all of the above",
    },
  
    {
      question:
        "HTML stands for",
      answers: {
        1: "hypermark language",
        2: "hypermix language",
        3: "hypertext markup language",
        4: "hypertension language",
      },
      correctAnswer: "hypertext markup language",
    },
  
    {
      question:
        "The link to a bookmark is added in an attribute named",
      answers: {
        1: "href",
        2: "link",
        3: "drc",
        4: "console.log",
      },
      correctAnswer: "link",
    },
  ];
  
  var startQuizEl = document.getElementById("start-quiz");
  var questions = document.getElementById("questions");
  var answers = document.getElementById("answers");
  var timerEl = document.getElementById("countdown");
  var score = document.getElementById("score");
  var initials = document.getElementById("initials");
  var submit = document.getElementById("submit");
  var highscores = document.getElementById("highscores");
  var activeStepIndex = 1;
  var timeLeft = 40;
  var games = [];
  
  
  startQuizEl.addEventListener("click", function () {
    countdown();
    renderQuestions(myQuestions[0]);
  });
  
  questions.addEventListener("click", function (event) {
    if (activeStepIndex === 5) {
      answers.textContent = "CONGRATULATIONS!  GAME OVER";
      score.textContent = timeLeft;
    } else if (
      event.target.textContent !== myQuestions[activeStepIndex - 1].correctAnswer
    ) {
      answers.textContent = "Try again.";
      timeLeft -= 5;
    } else {
      answers.textContent = "You are correct!";
      console.log(timeLeft);
      activeStepIndex++;
      renderQuestions(myQuestions[activeStepIndex - 1]);
    }
  });
  
  function renderQuestions(activeQuestion) {
    questions.innerHTML = "";
  
    var questionTitle = document.createElement("p");
    var answerList = document.createElement("ol");
    var answerItem1 = document.createElement("li");
    var answerItem2 = document.createElement("li");
    var answerItem3 = document.createElement("li");
    var answerItem4 = document.createElement("li");
  
    questionTitle.textContent = activeQuestion.question;
    answerItem1.textContent = activeQuestion.answers[1];
    answerItem2.textContent = activeQuestion.answers[2];
    answerItem3.textContent = activeQuestion.answers[3];
    answerItem4.textContent = activeQuestion.answers[4];
  
    answerList.append(answerItem1);
    answerList.append(answerItem2);
    answerList.append(answerItem3);
    answerList.append(answerItem4);
    questions.append(questionTitle);
    questions.append(answerList);
  }
  
  function countdown() {
    var timeInterval = setInterval(function () {
      if (timeLeft > 1 && activeStepIndex !== 5) {
        timerEl.textContent = timeLeft;
        timeLeft--;
      } else {
        clearInterval(timeInterval);
      }
    }, 1000);
  }
  
  
  submit.addEventListener("click", function (event) {
    event.preventDefault();
    var game = {
      initials: initials.value.trim(),
      score: timeLeft,
    };
    games.push(game);
    storeGames();
    renderGames();
  });
  
  function renderGames() {
    for (var i = 0; i < games.length; i++) {
      console.log(games[i]);
      var highScore = document.createElement("li");
      highScore.textContent = games[i].initials + " " + games[i].score;
      highscores.append(highScore);
    }
  
    
    console.log(games.length);
  }
  
  function storeGames() {
    console.log(games);
    localStorage.setItem("games", JSON.stringify(games));
  }
  
  function init() {
    var storeGames = JSON.parse(localStorage.getItem("games"));
    if (storeGames !== null) {
      games = storeGames;
    }
  }
  
  init();
  
 