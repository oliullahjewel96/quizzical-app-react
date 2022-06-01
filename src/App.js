import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";
function App() {
  const [showScreen, setShowScreen] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [count, setCount] = useState(0);
  const [displayResult, setDisplayResult] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setQuizData(
          data.results.map((question) => {
            return {
              ...question,
              id: nanoid(),
              answers: shuffle([
                ...question.incorrect_answers,
                question.correct_answer,
              ]),
              correct_answer: question.correct_answer,
              checkAnswers: false,
            };
          })
        )
      );
  }, [showScreen]);

  function shuffle(arr) {
    let array = arr.map((ans) => {
      return {
        id: nanoid(),
        answer: ans,
        isSelected: false,
      };
    });
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function handleSelect(id, selectedAnsId) {
    setQuizData((prevQuizData) => {
      return prevQuizData.map((question) => {
        return question.id === id
          ? {
              ...question,
              answers: question.answers.map((answer) => {
                return answer.id === selectedAnsId
                  ? {
                      ...answer,
                      isSelected: !answer.isSelected,
                    }
                  : { ...answer, isSelected: false };
              }),
              checkAnswers:
                question.correct_answer ===
                question.answers.find((answer) => answer.id === selectedAnsId)
                  .answer
                  ? true
                  : false,
            }
          : question;
      });
    });
  }

  function checkAnswers() {
    const correctAnswers = quizData.filter((question) => question.checkAnswers);
    setCount(correctAnswers.length);

    setDisplayResult(true);
  }

  const newQuizData = quizData.map((question) => {
    return (
      <Quiz
        key={question.id}
        id={question.id}
        question={question.question}
        answers={question.answers}
        handleSelect={handleSelect}
        correct_answer={question.correct_answer}
        checkAnswers={question.checkAnswers}
        displayResult={displayResult}
      />
    );
  });

  function playAgain() {
    setShowScreen(false);
    setDisplayResult(false);
    setCount(0);
    setQuizData((prevQuizData) =>
      prevQuizData.map((question) => {
        return {
          ...question,
          answers: question.answers.map((answer) => {
            return {
              ...answer,
              isSelected: false,
            };
          }),
          checkAnswers: false,
        };
      })
    );
  }

  function openSeparateScreen() {
    setShowScreen((prevShowScreen) => !prevShowScreen);
  }
  return (
    <div className="App">
      {showScreen ? (
        <div className="quiz-container">
          {newQuizData}

          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
            className="btn"
            onClick={checkAnswers}
          >
            Check answers
          </button>
          {displayResult && (
            <div className="count">
              <p>You scored {count} / 5 correct answer</p>
              <button className="btn" onClick={playAgain}>
                Play Again
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <h1 className="heading">Quizzical</h1>
          <p className="text">To start a quiz please click on the button</p>
          <button className="btn" onClick={openSeparateScreen}>
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
