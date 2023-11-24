const themes = {
  // ... temas e perguntas ...
  revolucao_inglesa: [
    {
      question: "Quais foram as causas para a Revolução Inglesa?",
      options: [
        "Concentração do poder pela nobreza Stuart; Disputa por maior poder político pela burguesia puritana; Disputas religiosas de fundo entre católicos e protestantes.",
        "Concentração do poder pela nobreza Tudor; Disputa por maior poder político pela burguesia puritana; Disputas religiosas de fundo entre católicos e protestantes.",
        "Concentração do poder pela nobreza Stuart; Disputa por maior poder político pela burguesia puritana; Disputas religiosas de fundo entre evangélicos e católicos.",
        "Concentração do poder pela nobreza Stuart; Disputa por maior poder político pela Nobreza; Disputas religiosas de fundo entre católicos e protestantes.",
      ],
      correctIndex: 0,
    },
    {
      question: "Quais foram os principais objetivos da Revolução Inglesa?",
      options: ["Limitar o poder do rei através do Parlamento; garantir a liberdade religiosa para os anglicanos e impedir a restauração do catolicismo na Inglaterra.",
       "Expandir o poder do rei através do Parlamento; garantir a liberdade religiosa para os anglicanos e impedir a restauração do protestantismo na Inglaterra.",
        "Expandir o poder do Parlamento através do rei; garantir a liberdade religiosa para os protestantes e impedir a restauração do catolicismo na Inglaterra.",
         "Limitar o poder do rei através do Parlamento; garantir a liberdade religiosa para os anglicanos e impedir a restauração do protestantismo na Inglaterra."],
      correctIndex: 0,
    },
  ],

  iluminismo: [
    {
      question: "No que os iluministas acreditavam?",
      options: [
        "Defendiam a liberdade política, econômica e religiosa de todos perante a lei, mas eram contra a crença em Deus.",
        "Defendiam a liberdade política, econômica e religiosa de todos perante a lei, mesmo não sendo contra a crença em Deus e defendiam o mercantilismo como sistema econômico.",
        "Os iluministas eram contra a disseminação do conhecimento, pois enalteciam o pensamento religioso.",
        "Defendiam a liberdade política, econômica e religiosa de todos perante a lei, mesmo não sendo contra a crença em Deus e eram contra o mercantilismo como sistema econômico.",
      ],
      correctIndex: 3,
    },
    {
      question: "Um dos principais iluministas do mundo, John Locke, determinou a criação de três poderes governamentais, quais eram eles? ",
      options: ["Executivo, Legislativo e Federativo",
      "Executivo, Legislativo e Judiciário",
      "Executivo, Parlamentarista e Federativo",
      "Iluminista, Legislativo e Federativo"],
      correctIndex: 0,
    },
  ],
  independencia_eua: [
    {
      question: "O estopim que levou os ingleses a anunciarem as Leis Intoleráveis sobre as Treze Colônias foi um evento em que os norte-americanos, disfarçados de índios, invadiram um porto e destruíram caixas de chá, lançando-as no mar. Esse acontecimento se passou em qual cidade norte-americana?",
      options: [
        "Filadélfia ",
        "Washington",
        "Boston",
        "Baltimore",
      ],
      correctIndex: 2,
    },
    {
      question: "A Guerra de Independência dos Estados Unidos foi finalizada por meio do:",
      options: ["Tratado de Versalhes ",
       "Tratado de Paris",
       "Tratado de Tordesilhas",
       "Tratado de Madrid"],
      correctIndex: 1,
    },
  ],
  revolucao_francesa: [
    {
      question: "O líder dos jacobinos foi:",
      options: ["Georges Jacques Danton", "Jean Paul Marat", "Maximilien Robespierre", "Olympe de Gouges"],
      correctIndex: 3,
    },
    {
      question: "Qual foi o estopim para a Revolução Francesa?",
      options: ["A convocação dos Estados Gerais.", "A queda da Bastilha", "A tentativa de fuga de Luís XVI e Maria Antonieta.", "A invasão da França por tropas austríacas."],
      correctIndex: 1,
    },
  ],
};

let currentTheme = "";
let currentQuestionIndex = 0;
let correctAnswers = 0;

function startQuiz(theme) {
  points = 0;
  currentTheme = theme;
  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  showQuestion();
  document.getElementById("theme-selection").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result").textContent = "";
  document.getElementById("title").style.display = "none";
  nextButton.disabled = true;
}

function showQuestion() {
  const currentQuestion = themes[currentTheme][currentQuestionIndex];
  const questionNumberElement = document.getElementById("question-number");
  const questionElement = document.getElementById("question");
  const optionsElements = document.querySelectorAll(".option");

  questionNumberElement.textContent = `Pergunta ${currentQuestionIndex + 1}`;
  questionElement.textContent = currentQuestion.question;

  currentQuestion.options.forEach((option, index) => {
    optionsElements[index].textContent = option;
  });
}

const verifyButton = document.getElementById("verify-button");
const nextButton = document.getElementById("next-button");
const quizForm = document.getElementById("quiz-form");
const correctAnswer = document.getElementById("correct-answer");

let isAnswerChecked = false;

function checkAnswer() {
  verifyButton.addEventListener("click", () => {
    if (isAnswerChecked) {
      return;
    }
  });

  const currentQuestion = themes[currentTheme][currentQuestionIndex];
  const selectedOption = document.querySelector('input[name="answer"]:checked');

  if (!selectedOption) {
    document.getElementById("warning").textContent =
      "Por favor, selecione uma resposta.";
    return;
  } else {
    document.getElementById("warning").textContent = "";
  }

  verifyButton.disabled = true;
  nextButton.disabled = false;

  quizForm.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.disabled = true;
  });

  const answerIndex = parseInt(selectedOption.value);
  const correctIndex = themes[currentTheme][currentQuestionIndex].correctIndex;

  if (answerIndex === correctIndex) {
    correctAnswer.textContent = "";
    correctAnswers++;
    points += 100;
  } else {
    incorrectAnswers++;
    points -= 100;
    correctAnswer.textContent =
      "Resposta Correta: " + currentQuestion.options[correctIndex];
  }
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < themes[currentTheme].length) {
    showQuestion();
  } else {
    showResults();
  }

  correctAnswer.textContent = "";

  isAnswerChecked = false;
  quizForm.reset();
  verifyButton.disabled = false;
  nextButton.disabled = true;
  quizForm.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.disabled = false;
  });
}

function showResults() {
  document.getElementById("title").textContent = "";
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("quiz-result").style.display = "block";
  document.getElementById("result").textContent =
    "Respostas Corretas: " + correctAnswers;
  document.getElementById("result-incorrect").textContent =
    "Respostas Incorretas: " + incorrectAnswers;
  document.getElementById("points").textContent = "Pontuação: " + points;
}
