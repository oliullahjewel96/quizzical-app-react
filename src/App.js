import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";
function App() {
  const [showScreen, setShowScreen] = useState(false);
  const [QuizData, setQuizData] = useState([]);

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
              correctAnswer: question.correct_answer,
            };
          })
        )
      );
  }, []);

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
    console.log(id, selectedAnsId);
  }

  const newQuizData = QuizData.map((question) => {
    return (
      <Quiz
        key={question.id}
        id={question.id}
        question={question.question}
        answers={question.answers}
        isSelected={question.isSelected}
        handleSelect={handleSelect}
      />
    );
  });

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
          >
            Check answers
          </button>
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
